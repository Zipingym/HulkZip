import Vector3 from './Vector';

export default interface Preprocesser {
  readonly length: number;
  calculate(arr: Array<Vector3>): Float32Array;
}
