import Vector3 from './Vector';

export default interface JointPosition {
  init(): Promise<void>;
  getJoint(): Promise<Array<Vector3>>;
}
