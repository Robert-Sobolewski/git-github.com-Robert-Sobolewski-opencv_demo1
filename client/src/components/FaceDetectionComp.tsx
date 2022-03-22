import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";

interface IState {
  imageDataUrl: string | null;
}
const FaceDetectionComp = () => {
  const [cameras, setCameras] = useState(0); // number of cameras
  const [state, setState] = useState<any>(null);
  const [repData, setRepData] = useState(null);
  const videoRef = useRef(null);
  let canvasFrame: any = document.getElementById("canvasFrame");
  let canvasResult: any = document.getElementById("canvasResult"); // canvasFrame is the id of <canvas>
  //let d = cv.imread("data");
  //let context = canvasFrame?.getContext("2d");
  //let s = new cv.ImageDataStream(context)

  // let src = new cv.Mat(height, width, cv.CV_8UC4);
  // let dst = new cv.Mat(height, width, cv.CV_8UC1);
  const FPS = 30;
  // function processVideo() {
  //     let begin = Date.now();
  //     context.drawImage(video, 0, 0, width, height);
  //     src.data.set(context.getImageData(0, 0, width, height).data);
  //     cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
  //     cv.imshow("canvasOutput", dst); // canvasOutput is the id of another <canvas>;
  //     // schedule next one.
  //     let delay = 1000/FPS - (Date.now() - begin);
  //     setTimeout(processVideo, delay);
  // }
  const handleCapture = async () => {
    let vid: any = document.getElementById("videoInput");
    canvasFrame.width = vid.width;
    canvasFrame.height = vid.height;
    canvasFrame.getContext("2d").drawImage(vid, 0, 0, vid.width, vid.height);
    //const image = cv.imencode("jpg", vid).toString("base64");
    const image = canvasFrame.toDataURL();
    await axios
      .post(
        "http://localhost:4000/img/",
        { img: image },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => setRepData(response.data))
      .catch((err) => console.error(err));
    // console.log(image);
  };
  useEffect(() => {
    let video = document.getElementById("videoInput"); // video is the id of video tag
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred! " + err);
      });
    //setTimeout(processVideo, 0);
  }, [videoRef]);

  return (
    <Fragment>
      <div className="face-detection-comp">
        <video id="videoInput" height="200" width="200" ref={videoRef}></video>
        <canvas id="canvasFrame" />
        <button id="capture" onClick={handleCapture}>
          Capture
        </button>
        <hr />
        <canvas id="canvasResult" />
        <p>{JSON.stringify(repData)}</p>
      </div>
    </Fragment>
  );
};

export default FaceDetectionComp;
