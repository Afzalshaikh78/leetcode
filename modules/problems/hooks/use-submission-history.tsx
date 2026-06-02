import { useEffect, useState } from "react";
import { getAllSubmissionByCurrentUserForProblem } from "../actions";

type SubmissionHistoryItem = {
  id: string;
  createdAt: string | Date;
  language: string;
  memory: string | null;
  time: string | null;
  status: string;
};

export function useSubmissionHistory(id: string) {
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionHistoryItem[]>([]);

  useEffect(() => {
    const fetchSubmissionHistory = async () => {
      try {
        const response = await getAllSubmissionByCurrentUserForProblem(id);
        if (response.success) {
          setSubmissionHistory(response.data ?? []);
        }
      } catch (error) {
        console.error("Error fetching submission history:", error);
      }
    };

    fetchSubmissionHistory();
  }, [id]);

  const addSubmission = (submission: SubmissionHistoryItem) => {
    setSubmissionHistory((prev) => [submission, ...prev]);
  };

  return {
    submissionHistory,
    addSubmission,
  };
}
