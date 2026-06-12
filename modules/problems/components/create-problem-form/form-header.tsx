"use client";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

type SampleType = "DP" | "string" | "array" | "linkedList" | "stack" | "binaryTree";

type FormHeaderProps = {
  sampleType: SampleType;
  setSampleType: (sampleType: SampleType) => void;
  onLoadSample: () => void;
};

export function FormHeader({ sampleType, setSampleType, onLoadSample }: FormHeaderProps) {
  return (
    <CardHeader className="pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CardTitle className="text-3xl flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-600" />
          Create Problem
        </CardTitle>

        <div className="flex flex-col md:flex-row gap-3">
          <SampleTypeToggle sampleType={sampleType} setSampleType={setSampleType} />
          <Button type="button" variant="secondary" size="sm" onClick={onLoadSample} className="gap-2">
            <Download className="w-4 h-4" />
            Load Sample
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}

const SAMPLE_BUTTONS: { type: SampleType; label: string }[] = [
  { type: "DP", label: "DP" },
  { type: "string", label: "String" },
  { type: "array", label: "Array" },
  { type: "linkedList", label: "Linked List" },
  { type: "stack", label: "Stack" },
  { type: "binaryTree", label: "Binary Tree" },
];

function SampleTypeToggle({ sampleType, setSampleType }: Pick<FormHeaderProps, "sampleType" | "setSampleType">) {
  return (
    <div className="flex flex-wrap border rounded-md overflow-hidden">
      {SAMPLE_BUTTONS.map(({ type, label }, index) => (
        <Button
          key={type}
          type="button"
          variant={sampleType === type ? "default" : "outline"}
          size="sm"
          className={["rounded-none border-0", index !== 0 ? "border-l border-l-border" : ""].join(" ")}
          onClick={() => setSampleType(type)}>
          {label}
        </Button>
      ))}
    </div>
  );
}
