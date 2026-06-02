"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
      Loading editor...
    </div>
  ),
});

const LANGUAGE_MAP = {
  javascript: "javascript",
  python: "python",
  java: "java",
};

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
}: {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: keyof typeof LANGUAGE_MAP;
}) {
  return (
    <div className="border rounded-md bg-slate-950 text-slate-50">
      <div className="px-4 py-2 bg-slate-800 border-b text-sm font-mono">
        {language}
      </div>

      <div className="h-75 w-full">
        <Editor
          height={"300px"}
          width="100%"
          defaultLanguage={LANGUAGE_MAP[language]}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            readOnly: false,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
