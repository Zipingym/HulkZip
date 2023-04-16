import { Vector3Array, Vector3 } from '$/landmark';
import middleware from './middleware';

export default class JsMiddleware {
  public static readonly output: number = 35;
  private static joints = [
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
  private static calcJoint(arr: Vector3Array) {
    const result = new Float32Array(JsMiddleware.joints.length);
    JsMiddleware.joints.forEach((joint: Array<number>, idx) => {
      let a = arr[joint[0]];
      let b = arr[joint[1]];
      let c = arr[joint[2]];
      let ab = [b.x - a.x, b.y - a.y, b.z - a.z];
      let bc = [c.x - b.x, c.y - b.y, c.z - b.z];

      let ab_vec = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
      let bc_vec = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]);
      let ab_norm = [ab[0] / ab_vec, ab[1] / ab_vec, ab[2] / ab_vec];
      let bc_norm = [bc[0] / bc_vec, bc[1] / bc_vec, bc[2] / bc_vec];
      let res =
        ab_norm[0] * bc_norm[0] +
        ab_norm[1] * bc_norm[1] +
        ab_norm[2] * bc_norm[2];
      result[idx] = res;
    });
    return result;
  }
  private static calcDistance(arr: Vector3Array) {
    const get_average_between_two_vec = (p1: Vector3, p2: Vector3) => {
      return {
        x: (p1.x + p2.x) / 2.0,
        y: (p1.y + p2.y) / 2.0,
        z: (p1.x + p2.z) / 2.0,
      };
    };

    const get_distance_between_two_vec = (p1: Vector3, p2: Vector3) => {
      let a = p2.x - p1.x;
      let b = p2.y - p1.y;
      let c = p2.z - p1.z;
      return Math.sqrt(a * a + b * b + c * c) / 3000.0;
    };

    const result = new Float32Array(JsMiddleware.distances.length + 1);

    result[0] = get_distance_between_two_vec(
      get_average_between_two_vec(arr[23], arr[24]),
      get_average_between_two_vec(arr[11], arr[12])
    );

    JsMiddleware.distances.forEach((dis, idx) => {
      result[idx + 1] = get_distance_between_two_vec(arr[dis[0]], arr[dis[1]]);
    });
    return result;
  }
  public static calc(arr: Vector3Array) {
    const result = new Float32Array(
      JsMiddleware.joints.length + 1 + JsMiddleware.distances.length
    );
    result.set(JsMiddleware.calcJoint(arr), 0);
    result.set(JsMiddleware.calcDistance(arr), JsMiddleware.joints.length);
    return result;
  }
}
