"use client";

import { SubmissionDetails } from "./submission-details";
import { TestCaseTable } from "./testcase-table";
import type { DetailedResult, SubmissionWithTestCases } from "../actions";

type ExecutionResponse = {
  success: boolean;
  submission?: SubmissionWithTestCases | null;
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
