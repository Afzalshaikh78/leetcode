"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProblemsHeader } from "./problems-header";
import { useProblemFilters } from "../hooks/use-problem-filters";
import { ProblemsFilters } from "./problem-filters";
import { usePagination } from "../hooks/use-pagination";
import { ProblemRow } from "./problem-row";
import { ProblemsEmpty } from "./problem-empty";
import { ProblemsPagination } from "./problems-pagination";
import CreatePlaylistModal from "@/modules/playlists/components/create-playlist";
import { usePlaylistActions } from "@/modules/playlists/hooks/use-playlist-action";
import AddToPlaylistModal from "@/modules/playlists/components/add-to-playlist";
import { Problem, User } from "@/lib/generated/prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteProblemModal from "./delete-problem-modal";
import { useState } from "react";

interface ProblemsTableProps {
  problems: Array<Problem & { solvedBy?: Array<{ userId: string }> }>;
  user: User | null;
}

const ProblemsTable = ({ problems = [], user }: ProblemsTableProps) => {
  const filters = useProblemFilters(problems);
  const pagination = usePagination(filters.filteredProblems);
  const playlist = usePlaylistActions();
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<(Problem & { solvedBy?: Array<{ userId: string }> }) | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProblem = async (problemId: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/problems/${problemId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete problem");
      }

      toast.success("Problem deleted successfully");
      setDeleteTarget(null);
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete problem";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      <ProblemsHeader onCreatePlaylist={playlist.openCreateModal} />

      <ProblemsFilters
        search={filters.search}
        onSearchChange={filters.setSearch}
        difficulty={filters.difficulty}
        onDifficultyChange={filters.setDifficulty}
        selectedTag={filters.selectedTag}
        onTagChange={filters.setSelectedTag}
        allTags={filters.allTags}
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Solved</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[120px]">Difficulty</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedItems.length > 0 ? (
                pagination.paginatedItems.map((problem) => (
                  <ProblemRow
                    key={problem.id}
                    problem={problem}
                    user={user}
                    onDelete={() => setDeleteTarget(problem)}
                    onSave={playlist.openAddToPlaylist}
                  />
                ))
              ) : (
                <ProblemsEmpty />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.showPagination && (
        <ProblemsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          displayRange={pagination.displayRange}
          canGoPrevious={pagination.canGoPrevious}
          canGoNext={pagination.canGoNext}
          onPrevious={pagination.goToPreviousPage}
          onNext={pagination.goToNextPage}
        />
      )}

      <CreatePlaylistModal isOpen={playlist.isCreateModalOpen} onClose={playlist.closeCreateModal} onSubmit={playlist.handleCreatePlaylist} />

      <AddToPlaylistModal isOpen={playlist.isAddToPlaylistModalOpen} onClose={playlist.closeAddToPlaylistModal} onSubmit={playlist.handleAddToPlaylist} problemId={playlist.selectedProblemId} />

      <DeleteProblemModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget ? handleDeleteProblem(deleteTarget.id) : Promise.resolve()}
        problem={deleteTarget}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProblemsTable;
