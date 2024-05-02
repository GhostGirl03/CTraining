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

export default securePage(function CreateTraining() {
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

                    <textarea id="quizes" name="quizes" rows="4" cols="50">
                    <div id="quiz">
    <form id="quiz-form">
        <p>1. What is the capital of France?</p>
        <input type="radio" name="q1" value="a"> a) London<br/>
        <input type="radio" name="q1" value="b"> b) Paris<br/>
        <input type="radio" name="q1" value="c"> c) Rome<br/>
        <br/>
        <p>2. Which planet is known a/s the Red Planet?</p>
        <input type="radio" name="q2" value="a"> a) Mars<br/>
        <input type="radio" name="q2" value="b"> b) Jupiter<br/>
        <input type="radio" name="q2" value="c"> c) Saturn<br>
        <br>
        <p>3. How many continents are there on Earth?</p>
        <input type="radio" name="q3" value="a"> a) 5<br>
        <input type="radio" name="q3" value="b"> b) 6<br>
        <input type="radio" name="q3" value="c"> c) 7<br>
        <br>
        <input type="submit" value="Submit">
    </form>
    <div id="results"></div>
</div>

<script>
    const quizForm = document.getElementById('quiz-form');
    const resultsDiv = document.getElementById('results');

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(quizForm);
        let score = 0;

        for (let pair of formData.entries()) {
            const questionNumber = pair[0].charAt(1); // Extracting question number from input name
            const correctAnswer = getCorrectAnswer(questionNumber);
            if (pair[1] === correctAnswer) {
                score++;
            }
        }

        resultsDiv.innerHTML = `You scored ${score} out of ${formData.entries().length / 3}`;
    });

    function getCorrectAnswer(questionNumber) {
        switch (questionNumber) {
            case '1':
                return 'b';
            case '2':
                return 'a';
            case '3':
                return 'c';
            default:
                return '';
        }
    }
</script>
                    </textarea>
                    <br />

                    <button type="button" >
                      Add Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button type="submit">
                Create Training
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
