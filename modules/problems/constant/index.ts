export const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
export const ITEMS_PER_PAGE = 5;

export const DEFAULT_FILTERS = {
  search: "",
  difficulty: "ALL",
  tag: "ALL",
};

export const DIFFICULTY_COLORS = {
  EASY: "bg-green-100 text-green-800 hover:bg-green-100",
  MEDIUM: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  HARD: "bg-red-100 text-red-800 hover:bg-red-100",
};

export const normalizeDifficulty = (difficulty?: string | null) => {
  return difficulty?.trim().toUpperCase() || "";
};

export const getDifficultyColor = (difficulty?: string | null) => {
  const normalizedDifficulty = normalizeDifficulty(difficulty) as keyof typeof DIFFICULTY_COLORS;
  return DIFFICULTY_COLORS[normalizedDifficulty] || "";
};

export const LANGUAGE_OPTIONS = [
  { value: 'JAVASCRIPT', label: 'JavaScript' },
  { value: 'PYTHON', label: 'Python' },
  { value: 'JAVA', label: 'Java' },
];


export const getEditorLanguage = (language:string) => {
  return language.toLowerCase();
};

export const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 16,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: 'on',
};
