import { useState, useMemo } from "react";

type ProblemFilterItem = {
  title: string;
  difficulty: string;
  tags?: string[];
};

export function useProblemFilters<T extends ProblemFilterItem>(problems: T[] = []) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    problems.forEach((problem) => problem.tags?.forEach((tag) => tagsSet.add(tag)));

    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]) as T[];

  return {
    search,
    difficulty,
    selectedTag,
    allTags,

    setSearch,
    setDifficulty,
    setSelectedTag,

    filteredProblems,
  };
}
