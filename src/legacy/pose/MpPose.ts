// import '@mediapipe/pose';
// import { Pose as _Pose, VERSION } from '@mediapipe/pose';
// import { Vector3Array } from '../../../landmark';

// //@ts-expect-error
// const Pose = _Pose ?? (window.Pose as _Pose);

// const MpPose = (
//   fileUrl: string = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/'
// ): Promise<(video: HTMLVideoElement) => Promise<Vector3Array>> => {
//   return new Promise((resolve, reject) => {
//     const pose = new Pose({
//       locateFile: (file) => {
//         return fileUrl + file;
//       },
//     });
//     pose.setOptions({
//       modelComplexity: 0,
//       smoothLandmarks: true,
//     });
//     pose.initialize().then(() => {
//       resolve((video: HTMLVideoElement) => {
//         return new Promise((res, rej) => {
//           pose.send({ image: video });
//           pose.onResults((poseResult) => {
//             res(poseResult.poseWorldLandmarks);
//           });
//         });
//       });
//     });
//   });
// };
// export default MpPose;
