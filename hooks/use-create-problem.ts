"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { z } from "zod";
import { defaultFormValues, problemSchema } from "@/modules/problems/schema";
import { SAMPLE_PROBLEMS } from "@/modules/problems/constant/sample-problem";
import { SampleType } from "@/modules/problems/components/create-problem-form/form-header";

type ProblemFormData = z.infer<typeof problemSchema>;

export function useCreateProblem() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [sampleType, setSampleType] = useState<SampleType>("DP");

  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: defaultFormValues,
  });

  const testCasesArray = useFieldArray({
    control: form.control,
    name: "testCases",
  });

  // useFieldArray requires objects, not primitives.
  // tags is string[] in the schema, so we manage it manually via form.setValue.
  const tagsValue = form.watch("tags");

  const tagsArray = {
    fields: tagsValue.map((value, id) => ({ id: String(id), value })),
    append: (value: string) => form.setValue("tags", [...tagsValue, value], { shouldValidate: true }),
    remove: (index: number) =>
      form.setValue(
        "tags",
        tagsValue.filter((_, i) => i !== index),
        { shouldValidate: true }
      ),
    replace: (values: string[]) => form.setValue("tags", values, { shouldValidate: true }),
    update: (index: number, value: string) => {
      const updated = [...tagsValue];
      updated[index] = value;
      form.setValue("tags", updated, { shouldValidate: true });
    },
  };

const onSubmit = async (values: ProblemFormData) => {
  try {
    setIsLoading(true);
    const response = await fetch("/api/create-problem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const text = await response.text(); // read as text first
      console.error("Server error response:", text);
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      toast.success("Problem created successfully");
      router.push("/problems");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create problem";
    console.error("Error creating problem:", error);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};

  const loadSampleData = () => {
    const sampleData = SAMPLE_PROBLEMS[sampleType as keyof typeof SAMPLE_PROBLEMS] as ProblemFormData;
    form.reset(sampleData);
    // No need to call tagsArray.replace / testCasesArray.replace separately —
    // form.reset replaces all fields including tags and testCases.
  };

  return {
    form,
    testCasesArray,
    tagsArray,
    isLoading,
    sampleType,
    setSampleType,
    onSubmit: form.handleSubmit(onSubmit),
    loadSampleData,
  };
}
