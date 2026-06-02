"use client";
import { getJudge0languageId } from "@/lib/judge0";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { executeCode, runCode } from "../actions";

type ProblemLike = {
  id: string;
  codeSnippets?: Record<string, string>;
  testCases: unknown;
};

type SubmissionLike = {
  id: string;
  createdAt: string | Date;
  language: string;
  memory: string | null;
  time: string | null;
  status: string;
};

export function useEditor(problem: ProblemLike | null, addSubmission: (s: SubmissionLike) => void, initialLanguage = "JAVASCRIPT") {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResponse, setExecutionResponse] = useState<unknown>(null);

  useEffect(() => {
    const nextCode = problem?.codeSnippets?.[selectedLanguage] ?? "";

    const frame = window.requestAnimationFrame(() => {
      setCode(nextCode);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedLanguage, problem]);

  const handleRun = async () => {
    if (!problem) return;

    try {
      setIsRunning(true);
      const language_id = getJudge0languageId(selectedLanguage);
      const testCases = Array.isArray(problem.testCases) ? (problem.testCases as Array<{ input: string; output: string }>) : [];
      const stdin = testCases.map((tc) => tc.input);
      const expected_outputs = testCases.map((tc) => tc.output);

      //  console.log("Sending to runCode:", { language_id, stdin, expected_outputs }); // ← add

      const res = await runCode(code, language_id, stdin, expected_outputs);

      //  console.log("runCode response:", res); // ← add

      setExecutionResponse(res);

      if (res.success) {
        toast.success("Code ran successfully");
      }
    } catch (error) {
      //  console.error("Error running code", error); // check full error in terminal
      toast.error("Error running code");
    } finally {
      setIsRunning(false);
    }
  };
  const handleSubmit = async () => {
    if (!problem) return;

    try {
      setIsSubmitting(true);
      const language_id = getJudge0languageId(selectedLanguage);
      const testCases = Array.isArray(problem.testCases) ? (problem.testCases as Array<{ input: string; output: string }>) : [];
      const stdin = testCases.map((tc) => tc.input);
      const expected_outputs = testCases.map((tc) => tc.output);

      const res = await executeCode(code, language_id, stdin, expected_outputs, problem.id);
      setExecutionResponse(res);

      if (res.success && res.submission) {
        addSubmission(res.submission);
        toast.success("Code executed successfully")
      }
    } catch (error) {
      console.error("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    code,
    setCode,
    isRunning,
    isSubmitting,
    executionResponse,
    handleRun,
    handleSubmit,
  };
}
