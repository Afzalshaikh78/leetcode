"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Send } from "lucide-react";
import { EDITOR_OPTIONS, getEditorLanguage, LANGUAGE_OPTIONS } from "../constant";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center bg-muted/20 text-sm text-muted-foreground">
      Loading editor...
    </div>
  ),
});

const CodeEditorPanel = ({
  code,
  onCodeChange,
  selectedLanguage,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}: any) => {
  const { theme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5" />
            Code Editor
          </CardTitle>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="min-h-100 border rounded-lg overflow-hidden">
          <Editor
            height={"400px"}
            width="100%"
            language={getEditorLanguage(selectedLanguage)}
            value={code}
            onChange={(value: string | undefined) => onCodeChange(value || "")}
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={EDITOR_OPTIONS as any}
          />
        </div>

        <div className="flex gap-3 mt-4">
            <Button
            onClick={onRun}
            disabled={isRunning}
            variant={"outline"}
            className="flex items-center gap-2"
            >
                {isRunning ? "Running..." : "Run"}
            </Button>

             <Button
             variant={"default"}
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditorPanel;
