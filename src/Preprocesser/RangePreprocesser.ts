import Preprocesser from '../interface/Preprocesser';
import Vector3 from '../interface/Vector';

export default class RangePreprocesser implements Preprocesser {
  private static distances = [
    [11, 13],
    [12, 14],
    [13, 15],
    [14, 16],
    [23, 25],
    [24, 26],
    [25, 27],
    [26, 28],
    [11, 15],
    [12, 16],
    [23, 27],
    [24, 28],
    [23, 15],
    [24, 16],
    [11, 27],
    [12, 28],
    [23, 16],
    [24, 15],
    [13, 14],
    [25, 26],
    [15, 16],
    [27, 28],
  ]; //일반적으로 static은 위에 위치
  //두 인덱스 값의 걸이 구하기
  private static calcDistance(arr1: Vector3, arr2: Vector3) {
    let xRange = arr1.x - arr2.x;
    let yRange = arr1.y - arr2.y;
    let zRange = arr1.z - arr2.z;

    let arrayRange: number[] = [xRange, yRange, zRange];
    return arrayRange;
  }

  public length: number = RangePreprocesser.distances.length * 3;

  public calculate(arr: Vector3[]): Float32Array {
    const flot32Array = new Float32Array(this.length);

    RangePreprocesser.distances.forEach((distance, idx) => {
      const result = RangePreprocesser.calcDistance(
        arr[distance[0]],
        arr[distance[1]]
      );
      flot32Array[idx * 3] = result[0];
      flot32Array[idx * 3 + 1] = result[1];
      flot32Array[idx * 3 + 2] = result[2];
    });

    return flot32Array;
  }
}
