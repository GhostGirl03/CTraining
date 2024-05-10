// src/pages/dashboard.jsx
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { securePage } from "@/services/securePage";
import { useEffect, useState } from "react";
import { getCompanies } from "@/services/getCompanies";
import { deleteCompany } from "@/services/deleteCompany";
import handler from "../api/hello";
import { DocumentInput } from "@/components/DocumentImput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrainingSchema } from "@/services/schemas";
import ReactPlayer from 'react-player';
import { Document } from 'react-pdf';

export default securePage (function CreateTraining(){
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const form = useForm({
    defaultValues: {
      quizes: [],
    },
    resolver: zodResolver(TrainingSchema),
  });
const values=form.watch()
  const handleSaveData = (data) => {
    console.log(data);
  };

  function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            question: 'What is 2 + 2?',
            options: ['2', '3', '4', '5'],
            answer: '4'
        },
        {
            question: 'What is the capital of France?',
            options: ['London', 'Paris', 'Rome', 'Berlin'],
            answer: 'Paris'
        },
        // Add more questions as needed
    ];
    const handleAnswerClick = (selectedAnswer) => {
      const isCorrect = selectedAnswer === questions[currentQuestion].answer;
      if (isCorrect) {
          setScore(score + 1);
      }
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
      } else {
          // Quiz is over
          alert(`Quiz Over! Your score is ${score}/${questions.length}`);
          setCurrentQuestion(0);
          setScore(0);
      }
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div>
            Dashboard for <strong>{user?.email || "Not authenticated"}</strong>
            <button type="button" onClick={handleSignOut}>
              Sign out
            </button>
            <ul></ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <form onSubmit={form.handleSubmit(handleSaveData)}>
            <div class="mb-3">
              <label for="name" class="form-label">
                Compliance Training
              </label>

              <input
                type="text"
                class="form-control"
                id="name"
                {...form.register("name")}
              />
            </div>

            <div class="mb-3">
              <label for="due_date" class="form-label">
                Due Date
              </label>

              <input
                type="date"
                class="form-control"
                id="due_date"
                {...form.register("duedate", { valueAsDate: true })}
              />
            </div>

            <div class="mb-3">
              <label for="youtube_video" class="form-label">
                Youtube Video
              </label>

              <input
                type="url"
                class="form-control"
                id="youtube_video"
                {...form.register("youtube")}
              />
              <ReactPlayer url={values.youtube} />
            </div>

            <div class="mb-3">
              <label for="choose a doc" class="form-label">
                Suporting document
              </label>
              <Controller
                control={form.control}
                name="document"
                render={({ field }) => (
                  <DocumentInput
                    bucket="documents"
                    value={field.value}
                    onChange={field.onChange}  
                  />
                )}
              />
                
            </div>

            <div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label for="quizes" class="form-label">
                      Quizes
                    </label>
                    <br />

                    <div>
                    <p>Question {currentQuestion + 1}:</p>
                    <p>{questions[currentQuestion].question}</p>
                    <ul>
                      {questions[currentQuestion].options.map((option, index) => (
                        <li key={index} onClick={() => handleAnswerClick(option)}>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="submit">Create Training</button>
          </div>
        </form>
      </div>
    </div>
  </div>
   );
  }
});