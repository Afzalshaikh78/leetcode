"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useProblem } from "@/modules/problems/hooks/use-problem";
import { Spinner } from "@/components/ui/spinner";

import { ProblemHeader } from "@/modules/problems/components/problem-header";
import { ProblemDescription } from "@/modules/problems/components/problem-description";
import { ProblemTabs } from "@/modules/problems/components/problem-tabs";
import { useEditor } from "@/modules/problems/hooks/use-editor";
import CodeEditorPanel from "@/modules/problems/components/code-editor-panel";
import TestCasesPanel from "@/modules/problems/components/testcases-panel";
import { ExecutionResults } from "@/modules/problems/components/execution-results";
import { useSubmissionHistory } from "@/modules/problems/hooks/use-submission-history";

const ProblemIdPage = () => {
  const params = useParams<{ id: string }>();

  const { problem, isLoading } = useProblem(params.id);
const { submissionHistory, addSubmission } = useSubmissionHistory(params.id);
const { selectedLanguage, setSelectedLanguage, code, setCode, isRunning, isSubmitting, executionResponse, handleRun, handleSubmit } = useEditor(problem, addSubmission);

  if (isLoading) {
    return (
      <div className="flex  items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <ProblemHeader problem={problem} />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* LEFT Panel */}
          <div className="min-w-0 space-y-6">
            <ProblemDescription problem={problem} />
            <ProblemTabs problem={problem} submissionHistory={submissionHistory} />
          </div>

          {/* RIGHT PANEL */}
          <div className="min-w-0 space-y-6">
            <CodeEditorPanel
              code={code}
              onCodeChange={setCode}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              onRun={handleRun}
              onSubmit={handleSubmit}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
            />

            <TestCasesPanel testCases={problem?.testCases} />

            {/* TODO: Execution result */}
            <ExecutionResults executionResponse={executionResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemIdPage;
