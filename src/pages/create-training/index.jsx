// src/pages/dashboard.jsx
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { securePage } from "@/services/securePage";
import { useEffect, useState } from "react";
import { getCompanies } from "@/services/getCompanies";
import { deleteCompany } from "@/services/deleteCompany";

export default securePage(function CreateTraining() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
          <div class="mb-3">
            <label for="name" class="form-label">
              Compliance Training
            </label>

            <input type="text" class="form-control" id="name" />
          </div>

          <div class="mb-3">
            <label for="due_date" class="form-label">
              Due Date
            </label>

            <input type="date" class="form-control" id="due_date" />
          </div>

          <div class="mb-3">
            <label for="youtube_video" class="form-label">
              Due Date
            </label>

            <input type="url" class="form-control" id="youtube_video" />
          </div>
        </div>
        <div className="col-6">Right</div>
      </div>
    </div>
  );
});
