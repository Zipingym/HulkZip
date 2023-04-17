import * as mp from '@mediapipe/pose';
import JointPosition from '../interface/JointPosition';
import Vector3 from '../interface/Vector';

//@ts-expect-error
const Pose = mp.Pose ?? (window.Pose as mpPose);

export default class MpJointPosition implements JointPosition {
  private pose: mp.PoseInterface;
  constructor(link: string, options: mp.Options) {
    console.log(mp.Pose);
    this.pose = new Pose({
      locateFile: (file) => {
        return `${link}${file}`;
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
  ): Promise<Vector3[]> {
    return new Promise((resolve, reject) => {
      this.pose.send({ image: buffer });
      this.pose.onResults((result: mp.Results) => {
        resolve(result.poseWorldLandmarks);
      });
    });
  }
}
