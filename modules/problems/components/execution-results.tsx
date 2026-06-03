"use client";

import { SubmissionDetails } from "./submission-details";
import { TestCaseTable } from "./testcase-table";

type DetailedResult = {
  testCase: number;
  passed: boolean;
  stdout: string | null;
  expected: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: string;
  memory?: string | undefined;
  time?: string | undefined;
};

type SubmissionWithTestCases = {
  id: string;
  createdAt: string | Date;
  language: string;
  memory: string | null;
  time: string | null;
  status: string;
  testCases: DetailedResult[];
};

type ExecutionResponse = {
  success: boolean;
  submission?: SubmissionWithTestCases;
  detailedResults?: DetailedResult[];
};

export function ExecutionResults({ executionResponse }: { executionResponse?: ExecutionResponse | null }) {
  if (!executionResponse?.success) return null;

  // handleSubmit → executeCode → returns { submission: { testCases, status, ... } }
  if (executionResponse.submission) {
    return (
      <div className="space-y-4 mt-4">
        <SubmissionDetails submission={executionResponse.submission} />
        <TestCaseTable testCases={executionResponse.submission.testCases} />
      </div>
    );
  }

  // handleRun → runCode → returns { detailedResults: [...], allPassed: true }
  if (executionResponse.detailedResults) {
    return (
      <div className="space-y-4 mt-4">
        <TestCaseTable testCases={executionResponse.detailedResults} />
      </div>
    );
  }

  return null;
}
