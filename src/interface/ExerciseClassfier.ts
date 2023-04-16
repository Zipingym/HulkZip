export default interface ExercisePipeline {
  init(): Promise<void>;
  classfier(arr: Float32Array): Promise<Array<number>>;
}
