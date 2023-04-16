import { Vector3Array } from './landmark';

const ExerciseClassfierPipeline = (
  videoToKeypoints: (gpubuffer: HTMLVideoElement) => Promise<Vector3Array>,
  keypointsPreProcesser: (arr: Vector3Array) => Float32Array,
  poseinfoToExerciseInfo: (arr: Float32Array) => Promise<Array<number>>
): ((video: HTMLVideoElement) => Promise<Array<number>>) => {
  return (video: HTMLVideoElement) => {
    return new Promise((resolve, reject) => {
      videoToKeypoints(video).then((a) => {
        if (a == undefined) {
          reject();
        } else {
          poseinfoToExerciseInfo(keypointsPreProcesser(a))
            .then(resolve)
            .catch(reject);
        }
      });
    });
  };
};

export default ExerciseClassfierPipeline;
