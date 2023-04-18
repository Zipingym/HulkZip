import Preprocesser from '../interface/Preprocesser';
import Vector3 from '../interface/Vector';

export default class AnglePreprocesser implements Preprocesser {
  private static joints = [
    // static은 맨 위에 쓰는 것이 좋음
    [11, 13, 15],
    [12, 14, 16],
    [23, 25, 27],
    [24, 26, 28],
    [25, 23, 24],
    [26, 24, 23],
    [11, 23, 25],
    [12, 24, 26],
    [13, 11, 23],
    [14, 12, 24],
    [13, 11, 12],
    [14, 12, 11],
    [25, 27, 31],
    [26, 28, 32],
  ];

  public length: number = AnglePreprocesser.joints.length;
  public calculate(arr: Vector3[]): Float32Array {
    let angleArr = new Float32Array(AnglePreprocesser.joints.length);
    AnglePreprocesser.joints.forEach(([idx1, idx2, idx3], idx) => {
      let v1 = {
        x1: arr[idx1].x - arr[idx2].x,
        y1: arr[idx1].y - arr[idx2].y,
        z1: arr[idx1].z - arr[idx2].z,
      };
      let v2 = {
        x2: arr[idx3].x - arr[idx2].x,
        y2: arr[idx3].y - arr[idx2].y,
        z2: arr[idx3].z - arr[idx2].z,
      };
      let v1mag = Math.sqrt(v1.x1 * v1.x1 + v1.y1 * v1.y1 + v1.z1 * v1.z1);
      let v1norm = { x: v1.x1 / v1mag, y: v1.y1 / v1mag, z: v1.z1 / v1mag };

      let v2mag = Math.sqrt(v2.x2 * v2.x2 + v2.y2 * v2.y2 + v2.z2 * v2.z2);
      let v2norm = { x: v2.x2 / v2mag, y: v2.y2 / v2mag, z: v2.z2 / v2mag };

      let res = v1norm.x * v2norm.x + v1norm.y * v2norm.y + v1norm.z * v2norm.z;
      let angle = Math.acos(res);
      angleArr[idx] = angle / Math.PI;
    });

    return angleArr;
  }
}
