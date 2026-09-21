import { useState, useEffect } from "react";
import { checkHealth } from "./services/api";

function App(){
  const [message,setMessage] = useState("Checking Backend");

  useEffect(()=>{
    checkHealth().then((data)=>{
      setMessage(data.message);
    }).catch(()=>{
      setMessage("Backend Connection Failed");
    })
  }, []);

  return (
    <div>
      <h1>AI Knowledge Base</h1>
      <p>{message}</p>
    </div>
  )
}

export default App;