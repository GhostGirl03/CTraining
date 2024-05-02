import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { securePage } from "@/services/securePage";
import {Link, Route,Routes} from "next/link";
import TrainId from "../train-id";





export default securePage(function TrainingID() {
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
         <div className="col-6">
            <h1>Compliance training</h1>
            <h2>Due:5/5/2024</h2>
            <a href="../train-id">

            <button type="button"> Shsre</button>
            </a>
            
         
            <h2> video youtube</h2>
            <p>document.pdf</p>
            <p>Quizes</p>
           
         </div>
         <div className="col-6">
          Employees
          <p>Tabla de empleados</p>
         </div>
    </div>
    </div>





























  )})