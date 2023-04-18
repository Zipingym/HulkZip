import Preprocesser from '../interface/Preprocesser';
import Vector3 from '../interface/Vector';

export default class RangePreprocesser2 implements Preprocesser {
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
  ];
  private static get_average_between_two_vec = (p1: Vector3, p2: Vector3) => {
    return {
      x: (p1.x + p2.x) / 2.0,
      y: (p1.y + p2.y) / 2.0,
      z: (p1.x + p2.z) / 2.0,
    };
  };
  private static calcDistance(arr1: Vector3, arr2: Vector3) {
    let xRange = arr1.x - arr2.x;
    let yRange = arr1.y - arr2.y;
    let zRange = arr1.z - arr2.z;

    return (
      Math.sqrt(xRange * xRange + yRange * yRange + zRange * zRange) / 3000.0
    );
  }

  public length: number = RangePreprocesser2.distances.length + 1;

  public calculate(arr: Vector3[]): Float32Array {
    const flot32Array = new Float32Array(this.length);
    flot32Array[0] = RangePreprocesser2.calcDistance(
      RangePreprocesser2.get_average_between_two_vec(arr[23], arr[24]),
      RangePreprocesser2.get_average_between_two_vec(arr[11], arr[12])
    );
    RangePreprocesser2.distances.forEach((distance, idx) => {
      const result = RangePreprocesser2.calcDistance(
        arr[distance[0]],
        arr[distance[1]]
      );
      flot32Array[idx + 1] = result;
    });

    return flot32Array;
  }
}
