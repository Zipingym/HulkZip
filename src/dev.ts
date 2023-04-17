import MpJointPosition from './JointPosition/MpJointPosition';
import videoSrc from '../static/test2.mp4';
import ExercisePipelineImpl from './ExercisePipeline';
import MergePreprocesser from './Preprocesser/MergePreprocesser';
import AnglePreprocesser from './Preprocesser/AnglePreprocesser';
import RangePreprocesser2 from './Preprocesser/RangePreprocesser2';
import Classfier from './ExerciseClassfier/Classfier';
import '@tensorflow/tfjs-backend-webgl';

import tflite from '../static/work.tflite';

const video = document.createElement('video');
video.src = videoSrc;

document.getElementById('app')?.appendChild(video);
video.muted = true;

const pipeline = new ExercisePipelineImpl();

const JointPosition = new MpJointPosition(
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/',
  { modelComplexity: 1 }
);
const preprocesser = new MergePreprocesser(
  new AnglePreprocesser(),
  new RangePreprocesser2()
);
const classfier = new Classfier(tflite);

Promise.all([JointPosition.init(), classfier.init()]).then(() => {
  video.play();
  pipeline.setJointPosition(JointPosition);
  pipeline.setPreprocesser(preprocesser);
  pipeline.setClassfier(classfier);

  setInterval(() => {
    pipeline.run(video).then(console.log);
  }, 1000 / 60);
});
