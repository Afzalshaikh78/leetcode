import axios from "axios";

export function getJudge0languageId(language: string) {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  };

  return languageMap[language.toUpperCase() as keyof typeof languageMap];
}

export function getLanguageName(languageId: number) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES[languageId as keyof typeof LANGUAGE_NAMES] || "Unknown";
}


interface Judge0SubmissionResponse {
  source_code: string;
  language_id: number;
  stdin: string;
  base64_encoded: boolean;
}

export async function submitBatch(submissions: Judge0SubmissionResponse[]) {
  const options = {
    method: "POST",
    url: "https://judge029.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": "62000bded8msh797b06efe3466c1p1087d4jsn988a1acf2d8a",
      "x-rapidapi-host": "judge029.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions: submissions,
    },
  };

  const { data } = await axios.request(options);

  return data;
}

export async function pollBatchResults(tokens: string[]) {
  while (true) {
    const options = {
      method: "GET",
      url: "https://judge029.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokens.join(","),
        base64_encoded: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "62000bded8msh797b06efe3466c1p1087d4jsn988a1acf2d8a",
        "x-rapidapi-host": "judge029.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.request(options);

    const results = data.submissions;

    const isAllDone = results.every((r: { status: { id: number } }) => r.status.id !== 1 && r.status.id !== 2);

    if (isAllDone) return results;

    await sleep(1000);
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
