import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle, Clock, Cpu, Code, Calendar } from "lucide-react";

type SubmissionHistoryItem = {
  id: string;
  createdAt: string | Date;
  language: string;
  memory: string | null;
  time: string | null;
  status: string;
};

export const SubmissionHistory = ({ submissions = [] }: { submissions?: SubmissionHistoryItem[] }) => {
  if (!submissions.length) {
    return (
      <div className="text-sm text-muted-foreground">No submissions yet</div>
    );
  }

  const formatMemory = (memory: string | null) => {
    if (!memory) return 'N/A';
    try {
      const memoryArray = JSON.parse(memory);
      const avgMemory = memoryArray.reduce((a: number, b: string) => a + parseFloat(b), 0) / memoryArray.length;
      return `${avgMemory.toFixed(2)} KB`;
    } catch {
      return 'N/A';
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return 'N/A';
    try {
      const timeArray = JSON.parse(time);
      const avgTime = timeArray
        .map((t: string) => parseFloat(t.replace(" s", "")))
        .reduce((a: number, b: number) => a + b, 0) / timeArray.length;
      return `${avgTime.toFixed(3)} s`;
    } catch {
      return 'N/A';
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollArea className="h-100 pr-4">
      <div className="space-y-3 md:space-y-4 flex flex-col gap-3 mb-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="rounded-lg border bg-muted/50">
            <div className="p-4 m-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  {submission.status === "Accepted" ? (
                    <Badge style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "rgb(34,197,94)" }}>
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Accepted
                    </Badge>
                  ) : (
                    <Badge style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "rgb(239,68,68)" }}>
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(submission.createdAt)}
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Language</p>
                    <p className="text-sm font-medium">{submission.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Memory</p>
                    <p className="text-sm font-medium">{formatMemory(submission.memory)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">{formatTime(submission.time)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
