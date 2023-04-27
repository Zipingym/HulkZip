import videoSrc from '../static/test3.mp4';
import tflite from '../static/work.tflite';
// import "@tensorflow/tfjs-backend-webgl";
import {
  TfliteClassfier,
  Pipeline,
  MpJointPosition,
  MergePreprocesser,
  AnglePreprocesser,
  DisPreprocesser2,
  DisPreprocesser,
} from './main';
import WebcamBuilder from './webcam';

const video = document.createElement('video');
video.src = videoSrc;

document.getElementById('app')?.appendChild(video);
video.muted = true;

const pipeline = new Pipeline();

const JointPosition = new MpJointPosition({ modelComplexity: 1 });
const preprocesser = new DisPreprocesser();

const classfier = new TfliteClassfier(tflite);

Promise.all([
  JointPosition.init(),
  classfier.init(),
  import('@tensorflow/tfjs-backend-webgl'),
  WebcamBuilder(video),
]).then(() => {
  video.play();
  pipeline.setJointPosition(JointPosition);
  pipeline.setPreprocesser(preprocesser);
  pipeline.setClassfier(classfier);

  setInterval(() => {
    pipeline.run(video).then((res) => console.log());
  }, 1000 / 60);
});
