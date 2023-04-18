import * as mp from '@mediapipe/pose';
import JointPosition from '../interface/JointPosition';
import Vector3 from '../interface/Vector';

//@ts-expect-error
const Pose = mp.Pose ?? (window.Pose as mpPose);

export default class MpJointPosition implements JointPosition {
  private pose: mp.PoseInterface;
  constructor(
    options: mp.Options,
    link: string = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
  ) {
    this.pose = new Pose({
      locateFile: (file) => {
        return `${link}/${file}`;
      },
    });
    this.pose.setOptions(options);
  }

  async init(): Promise<void> {
    await this.pose.initialize();
    return;
  }

  getJoint(
    buffer: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement
  ): Promise<{
    joint: Array<Vector3>;
    accuracy: Array<number>;
  }> {
    return new Promise((resolve, reject) => {
      this.pose.send({ image: buffer });
      this.pose.onResults((result: mp.Results) => {
        const joint = new Array();
        const accuracy = new Array();
        result.poseWorldLandmarks.forEach((lmd) => {
          joint.push({
            x: lmd.x,
            y: lmd.y,
            z: lmd.z,
          });
          accuracy.push(lmd.visibility ?? 0);
        });
        resolve({
          joint,
          accuracy,
        });
      });
    });
  }
}
