import axios from "axios";

const GLOT_URL = "https://glot.io/api/run";

const LANGUAGE_MAP: Record<number, { language: string; version: string }> = {
  63: { language: "javascript", version: "latest" },
  71: { language: "python", version: "latest" },
  62: { language: "java", version: "latest" },
};

const FILE_NAMES: Record<string, string> = {
  javascript: "main.js",
  python: "main.py",
  java: "Main.java",
};

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

interface Judge0SubmissionRequest {
  source_code: string;
  language_id: number;
  stdin: string;
  base64_encoded: boolean;
  wait?: boolean;
  expected_output?: string;
}

const resultCache = new Map<string, object>();

export async function submitBatch(submissions: Judge0SubmissionRequest[]) {
  const results = await Promise.all(
    submissions.map(async (sub) => {
      const lang = LANGUAGE_MAP[sub.language_id];
      if (!lang) throw new Error(`Unsupported language_id: ${sub.language_id}`);

      const start = Date.now();

      const { data } = await axios.post(
        `${GLOT_URL}/${lang.language}/${lang.version}`,
        {
          files: [{ name: FILE_NAMES[lang.language], content: sub.source_code }],
          stdin: sub.stdin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(process.env.GLOT_API_TOKEN && {
              Authorization: `Token ${process.env.GLOT_API_TOKEN}`,
            }),
          },
        }
      );

      const elapsed = ((Date.now() - start) / 1000).toFixed(3);

      const stdout = data.stdout ?? "";
      const stderr = data.stderr ?? "";
      const compile_output = data.build_stderr ?? null;

      const result = {
        stdout,
        stderr,
        compile_output,
        status: {
          id: stderr || compile_output ? 11 : 3,
          description: stderr || compile_output ? "Runtime Error" : "Accepted",
        },
        memory: "N/A",
        time: elapsed,
      };

      const token = crypto.randomUUID();
      resultCache.set(token, result);

      return { token };
    })
  );

  return results;
}

export async function pollBatchResults(tokens: string[]) {
  return tokens.map((token) => {
    const result = resultCache.get(token);
    resultCache.delete(token);
    return result;
  });
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
