"use client";

import { useMemo } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type DeleteProblemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  problem: {
    id: string;
    title: string;
    difficulty: string;
  } | null;
  isLoading?: boolean;
};

const getDifficultyBadgeClass = (difficulty: string) => {
  if (difficulty === "EASY") return "bg-green-600 text-white";
  if (difficulty === "MEDIUM") return "bg-yellow-600 text-white";
  if (difficulty === "HARD") return "bg-red-600 text-white";
  return "bg-slate-600 text-white";
};

const DeleteProblemModal = ({
  isOpen,
  onClose,
  onConfirm,
  problem,
  isLoading = false,
}: DeleteProblemModalProps) => {
  const problemTitle = useMemo(() => problem?.title ?? "this problem", [problem]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Problem
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. The problem, submissions, and solved records will be removed.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/30">
          <p className="text-sm font-medium text-foreground">You are deleting:</p>
          <p className="mt-1 text-base font-semibold">{problemTitle}</p>
          <div className="mt-3">
            <Badge className={`${getDifficultyBadgeClass(problem?.difficulty ?? "")} border-0`}>{problem?.difficulty ?? "N/A"}</Badge>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading} className="gap-2">
            <Trash2 className="h-4 w-4" />
            {isLoading ? "Deleting..." : "Delete Problem"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProblemModal;
