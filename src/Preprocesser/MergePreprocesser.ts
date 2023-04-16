import Preprocesser from '$/interface/Preprocesser';
import Vector3 from '$/interface/Vector';

export default class MergePreprocesser implements Preprocesser {
  private preprocessers: Array<Preprocesser>;
  public length: number;
  constructor(...preprocessers: Array<Preprocesser>) {
    this.preprocessers = preprocessers;
    this.length = 0;
    this.preprocessers.forEach((preprocesser) => {
      this.length += preprocesser.length;
    });
  }

  calculate(arr: Vector3[]): Float32Array {
    const result = new Float32Array(this.length);
    let idx = 0;
    this.preprocessers.forEach((preprocesser) => {
      preprocesser.calculate(arr).forEach((val) => {
        result[idx++] = val;
      });
    });
    return result;
  }
}
