import { UserRole } from "@/lib/generated/prisma/enums";
import { getJudge0languageId, submitBatch } from "@/lib/judge0";
import { currentUserRole } from "@/modules/auth/actions";
import { NextRequest, NextResponse } from "next/server";
import test from "node:test";

export async function POST(request: NextRequest) {
  try {
    const userRole = await currentUserRole();
    if (userRole !== UserRole.ADMIN) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = await request.json();

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases ||
      !codeSnippets ||
      !referenceSolutions
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "Test cases are required" },
        { status: 400 },
      );
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      // 1.get judge0 language id for current lang
      const languageId = getJudge0languageId(language);

      // 2. prepare judge0 submissions for all test cases

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      // 3. Submit all testcases in one batch

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res:any)=>res.token);
      return NextResponse.json({ submissionResults }, { status: 200 });
    }
  } catch (error) {}
}
