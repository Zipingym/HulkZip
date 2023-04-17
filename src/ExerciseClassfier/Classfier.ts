import ExerciseClassfier from '../interface/ExerciseClassfier';
import { Tensor } from '@tensorflow/tfjs-core';
import * as tflite from '@tensorflow/tfjs-tflite';
import * as tf from '@tensorflow/tfjs-core';

tflite.setWasmPath('./tf/');

export default class Classfier implements ExerciseClassfier {
  private member?: tflite.TFLiteModel;

  constructor(private tfliteurl: string) {}
  public async init(): Promise<void> {
    this.member = await tflite.loadTFLiteModel(this.tfliteurl);
    return;
  }

  public async classfier(arr: Float32Array): Promise<Array<number>> {
    if (this.member != undefined) {
      const result: Tensor = this.member.predict(
        tf.tensor2d(arr, [1, arr.length])
      ) as Tensor;
      //@ts-expect-error
      const resultArr: Array<number> = (await result.array())[0];
      return resultArr;
    } else {
      return [];
    }
  }
}
