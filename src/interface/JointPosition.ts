import Vector3 from './Vector';

export default interface JointPosition {
  init(): Promise<void>;
  getJoint(
    video: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
  ): Promise<{
    joint: Array<Vector3>;
    accuracy: Array<number>;
  }>;
}
