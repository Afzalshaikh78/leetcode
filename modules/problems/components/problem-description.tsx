import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { ExampleSection } from "./example-section";
import { ConstraintsSection } from "./constraint-section";
import { Problem } from "@/lib/generated/prisma/client";


interface ProblemDescriptionProps {
  problem: Problem | null;
}

export function ProblemDescription({ problem  }: ProblemDescriptionProps) {

  // console.log(problem?.examples)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          Problem Description
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <p className="text-foreground leading-relaxed">
            {problem?.description}
          </p>
          {
            problem?.examples ? Object.values(problem.examples as Record<string, { input: string; output: string; explanation?: string }>).map((example, index)=>(

              <ExampleSection key={index} example={example} index={index}/>
            )) : null
          }
          <ConstraintsSection constraints={problem?.constraints}/>
        </div>
      </CardContent>
    </Card>
  );
}
