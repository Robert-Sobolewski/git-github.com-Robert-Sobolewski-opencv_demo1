import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import FaceDetectionComp from "./components/FaceDetectionComp";

function App() {
  const socket = socketIOClient("http://127.0.0.1:4000");
  const [response, setResponse] = useState(null);
  useEffect(() => {
    socket.on("FromApi", (data) => {
      setResponse(data);
    });
  }, []);
  return (
    <div className="App">
      <h1>hello world</h1>
      <p>{JSON.stringify(response)}</p>
      <FaceDetectionComp />
    </div>
  );
}

export default App;
