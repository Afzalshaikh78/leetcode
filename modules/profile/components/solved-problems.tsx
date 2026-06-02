import React from 'react';
import { Trophy, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SolvedProblemItem = {
  id: string;
  createdAt: string | Date;
  problem?: {
    title?: string | null;
    difficulty?: string | null;
  } | null;
};

type DifficultyStyle = {
  badgeColor: string;
  cardClass: string;
  iconClass: string;
};

const difficultyConfig: Record<string, DifficultyStyle> = {
  EASY: {
    badgeColor: "#22c55e",
    cardClass: "bg-green-900/60 border border-green-700/50",
    iconClass: "bg-green-700",
  },
  MEDIUM: {
    badgeColor: "#eab308",
    cardClass: "bg-yellow-900/60 border border-yellow-700/50",
    iconClass: "bg-yellow-700",
  },
  HARD: {
    badgeColor: "#ef4444",
    cardClass: "bg-red-900/60 border border-red-700/50",
    iconClass: "bg-red-700",
  },
};

const getConfig = (difficulty: string): DifficultyStyle =>
  difficultyConfig[difficulty] ?? {
    badgeColor: "#64748b",
    cardClass: "bg-slate-800/60 border border-slate-700/50",
    iconClass: "bg-slate-700",
  };

const SolvedProblems = ({ solvedProblems = [] }: { solvedProblems?: SolvedProblemItem[] }) => {
  const formatDate = (dateValue: string | Date | null | undefined) => {
    if (!dateValue) return "Unknown";

    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "Unknown";

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-green-500" />
          <CardTitle className="text-2xl">Solved Problems</CardTitle>
          <Badge variant="default">{solvedProblems.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {solvedProblems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Problems Solved Yet</h3>
            <p className="text-muted-foreground">Start solving problems to see your achievements here!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solvedProblems.map((solvedProblem) => {
              const problem = solvedProblem?.problem;
              const problemTitle = problem?.title ?? "Solved Problem";
              const problemDifficulty = problem?.difficulty ?? "N/A";
              const style = getConfig(problemDifficulty);

              return (
                <Card key={solvedProblem.id} className={`border-0 transition-all duration-200 hover:shadow-md ${style.cardClass}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-full p-2 ${style.iconClass}`}>
                        <CheckCircle className={`rounded-full p-2 ${style.iconClass}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold">{problemTitle}</h3>
                        <div className="mb-3 text-sm text-muted-foreground">
                          <Badge
                            className="border-0 text-white"
                            style={{ backgroundColor: style.badgeColor }}
                          >
                            {problemDifficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Solved on {formatDate(solvedProblem?.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolvedProblems;
