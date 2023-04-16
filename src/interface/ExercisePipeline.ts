import ExerciseClassfier from './ExerciseClassfier';
import JointPosition from './JointPosition';
import Preprocesser from './Preprocesser';

export default interface ExercisePipeline {
  setJointPosition(pos: JointPosition): Promise<void>;
  setPreprocesser(pro: Preprocesser): void;
  setClassfier(cla: ExerciseClassfier): Promise<void>;
}
