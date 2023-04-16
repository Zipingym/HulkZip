import ExerciseClassfier from './ExerciseClassfier';
import JointPosition from './JointPosition';
import Preprocesser from './Preprocesser';

export default interface ExercisePipeline {
  setJointPosition(pos: JointPosition): void;
  setPreprocesser(pro: Preprocesser): void;
  setClassfier(cla: ExerciseClassfier): void;
  run(
    buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
  ): Promise<Array<number>>;
}
