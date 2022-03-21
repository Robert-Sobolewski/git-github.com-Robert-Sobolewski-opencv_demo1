import React, { Fragment, useEffect, useRef, useState } from "react";

interface IState {
  imageDataUrl: string | null;
}
const FaceDetectionComp = () => {
  const [cameras, setCameras] = useState(0); // number of cameras
  const [state, setState] = useState<any>(null);
  const videoRef = useRef(null);
  let canvasFrame: any = document.getElementById("canvasFrame"); // canvasFrame is the id of <canvas>
  //let d = cv.imread("data");
  let context = canvasFrame?.getContext("2d");
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
        <video id="videoInput" height="300" width="300" ref={videoRef}></video>
        <canvas id="canvasFrame" />
      </div>
    </Fragment>
  );
};

export default FaceDetectionComp;
