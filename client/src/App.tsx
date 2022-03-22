import axios from "axios";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import FaceDetectionComp from "./components/FaceDetectionComp";

function App() {
  const [anum, setAnum] = useState<number>(0);
  // const socket = socketIOClient("http://localhost:4000/");
  const [response, setResponse] = useState(null);
  const fetchData = async () => {
    return await axios
      .get("http://localhost:4000/")
      .then((res) => setResponse(res.data))
      .catch((err) => console.error(err));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let a = await axios
      .post(
        "http://localhost:4000/calc/",
        {
          a: anum,
          b: anum,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => setResponse(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>hello world</h1>
      <p>resp = {JSON.stringify(response)}</p>
      <input
        type="number"
        onChange={(e) => setAnum(Number(e.target.value))}
        value={anum}
        name=""
        id="mnum"
      />
      <button onClick={(e) => handleClick(e)}>add 2 numbers</button>
      <FaceDetectionComp />
    </div>
  );
}

export default App;
