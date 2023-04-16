import MpJointPosition from './JointPosition/MpJointPosition';
import videoSrc from '$static/test2.mp4';

const video = document.createElement('video');
video.src = videoSrc;

document.getElementById('app')?.appendChild(video);
video.muted = true;
video.play();

const joint = new MpJointPosition(
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/',
  { modelComplexity: 0 }
);
joint.init().then(() => {
  joint.getJoint(video);
});
