import { create } from "zustand";

// The answers of the quiz being taken, by question id; nothing reaches the server until Submit.
type AnswersStore = {
  answers: Record<string, string>;
  setAnswer: (questionId: string, answer: string) => void;
  clearAnswers: () => void;
};

export const useAnswersStore = create<AnswersStore>((set) => ({
  answers: {},
  setAnswer: (questionId, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: answer } })),
  clearAnswers: () => set({ answers: {} }),
}));
