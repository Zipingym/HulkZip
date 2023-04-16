export default interface ExerciseClassfier {
  init(): Promise<void>;
  classfier(arr: Float32Array): Promise<Array<number>>;
}
