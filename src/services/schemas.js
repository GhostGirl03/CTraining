import { z } from "zod";

export const QuizSchema = z.object({
  question: z.string().min(1, "Question is required"),
  correct: z.string().min(1, "Answer is required"),
  incorrect1: z.string().min(1, "Incorrect1 is required"),
  incorrect2: z.string().min(1, "Incorrect2 is required"),
});

export const TrainingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  duedate: z.date(),
  youtube: z.string().min(1, "Link is required"),
  document: z.string().min(1, "Document is required"),
  quizes: z.array(QuizSchema),
});
