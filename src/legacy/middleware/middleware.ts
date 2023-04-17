export default interface middleware<T> {
  output: number;
  calc: (arg: T) => Float32Array;
}
