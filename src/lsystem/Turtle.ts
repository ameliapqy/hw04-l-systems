import { vec3, vec4, mat4, quat } from 'gl-matrix';
import { toRadian } from '../globals';
// import { fromValues } from 'gl-matrix/src/gl-matrix/vec2';

class Turtle {
  pos: vec3 = vec3.create();
  up: vec3 = vec3.create();
  right: vec3 = vec3.create();
  forward: vec3 = vec3.create();
  quaternion: quat = quat.create();
  scale: vec3 = vec3.create();
  depth: number = 0;
  stepSize: number = 1;
  controls: any;
  deg: number = toRadian(25.0);
  transform: mat4 = mat4.create();

  constructor(pos: vec3, up: vec3, right: vec3, forward: vec3, scale: vec3, q: quat, depth: number, controls: any) {
    this.pos = pos;
    this.up = up;
    this.right = right;
    this.forward = forward;
    this.quaternion = q;
    this.scale = scale;
    this.depth = depth;
    this.controls = controls;
  }

  updateTransform() {
    console.log('transform:' + this.transform);
    mat4.fromRotationTranslationScale(this.transform, this.quaternion, this.pos, this.scale);
    console.log('transform:' + this.transform);
  }

  copy() {
    let newt = new Turtle(this.pos, this.up, this.right, this.forward, this.scale, this.quaternion, this.depth, this.controls);
    return newt;
  }

  moveForward() {
    vec3.add(this.pos, this.pos, this.forward);
    console.log('pos: ' + this.pos);
    // vec3.scaleAndAdd(this.pos, this.pos, this.forward, this.stepSize);
    this.updateTransform();
    return this.transform;
  }

  rotatePos() {
    this.rotateAngleAxis(this.deg, this.forward);
  }

  rotateNeg() {
    this.rotateAngleAxis(-this.deg, this.forward);
  }

  rotateAngleAxis(angle: number, axis: vec3) {
    vec3.normalize(axis, axis);
    let q: quat = quat.create();
    quat.setAxisAngle(q, axis, angle);

    let rotMat: mat4 = mat4.create();
    mat4.fromQuat(rotMat, q);
    let temp: vec4 = vec4.fromValues(this.forward[0], this.forward[1], this.forward[2], 0);
    vec4.transformQuat(temp, temp, q);
    this.forward = vec3.fromValues(temp[0], temp[1], temp[2]);
    quat.multiply(this.quaternion, q, this.quaternion);
    quat.normalize(this.quaternion, this.quaternion);
  }
}

export default Turtle;
