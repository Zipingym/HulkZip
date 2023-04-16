import * as tf from '@tensorflow/tfjs-core';
import { Tensor } from '@tensorflow/tfjs-core';
import * as tflite from '@tensorflow/tfjs-tflite';

tflite.setWasmPath('./tf/');

const Classfier = (
  modelUrl: string
): Promise<(tensor: Float32Array) => Promise<Array<number>>> => {
  return new Promise((resolve, reject) => {
    tflite.loadTFLiteModel(modelUrl).then((model) => {
      resolve((tensor: Float32Array) => {
        return new Promise((res_in, rej_in) => {
          const result: Tensor = model.predict(
            tf.tensor2d(tensor, [1, 14 + 22 + 1])
          ) as Tensor;
          result.array().then((answer) => {
            //@ts-ignore
            answer = answer[0] as Array<number>;
            res_in(answer);
          });
        });
      });
    });
  });
};

export default Classfier;
