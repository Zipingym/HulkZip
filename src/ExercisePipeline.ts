import Classfier from './legacy/class/Classfier';
import ExerciseClassfier from './interface/ExerciseClassfier';
import ExercisePipeline from './interface/ExercisePipeline';
import JointPosition from './interface/JointPosition';
import Preprocesser from './interface/Preprocesser';

//extends -> 인터페이스, 클래스 상속 / implements -> 클래스가 인터페이스를 상속받을 때 사용
export default class ExercisePipelineImpl implements ExercisePipeline {
  private jointPosition?: JointPosition;
  private preprocesser?: Preprocesser;
  private classfier?: ExerciseClassfier;

  setJointPosition(pos: JointPosition): void {
    this.jointPosition = pos;
  }
  setPreprocesser(pro: Preprocesser): void {
    this.preprocesser = pro;
  }
  setClassfier(cla: ExerciseClassfier): void {
    this.classfier = cla;
  }

  async run(
    buffer: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
  ): Promise<Array<number>> {
    if (
      this.jointPosition != undefined &&
      this.preprocesser != undefined &&
      this.classfier != undefined
    ) {
      const temp = this.preprocesser.calculate(
        await this.jointPosition.getJoint(buffer)
      );
      return this.classfier.classfier(temp);
    } else {
      throw new Error('');
    }
  }
}
