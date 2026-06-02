import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

type TestCaseItem = {
  passed: boolean;
  memory?: string | null;
  time?: string | null;
  stdout?: string | null;
  expected?: string | null;
};

export const TestCaseTable = ({ testCases }: { testCases: TestCaseItem[] }) => {
  return (
    <div className="w-full rounded-lg border">
      <Table>
        <TableCaption>Test Case Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Case #</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Output</TableHead>
            <TableHead>Expected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((testCase, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">Test {index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {testCase.passed ? (
                    <Badge className="hover:bg-green-500/20" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "rgb(34,197,94)" }}>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge className="hover:bg-red-500/20" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "rgb(239,68,68)" }}>
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{testCase.memory}</TableCell>
              <TableCell>{testCase.time}</TableCell>
              <TableCell className="max-w-[200px] truncate font-mono text-sm">{testCase.stdout}</TableCell>
              <TableCell className="max-w-[200px] truncate font-mono text-sm">{testCase.expected}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
