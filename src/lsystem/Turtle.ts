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
  tempScale: vec3 = vec3.create();
  depth: number = 0;
  stepSize: vec3 = vec3.create();
  controls: any;
  deg: number = toRadian(25.0);
  transform: mat4 = mat4.create();

  constructor(pos: vec3, up: vec3, right: vec3, forward: vec3, scale: vec3, q: quat, depth: number, controls: any) {
    this.pos = pos;
    this.up = up;
    this.right = right;
    this.forward = forward;
    this.quaternion = q;
    this.depth = depth;
    this.controls = controls;
    this.scale = scale;
    this.stepSize = vec3.fromValues(1, 1, 1);
    this.tempScale = vec3.fromValues(5.0, 5.0, 5.0);
  }

  updateTransform() {
    mat4.fromRotationTranslationScale(this.transform, this.quaternion, this.pos, this.scale);
  }

  updateTransformU() {
    let fs1 = this.controls.flower_scale;

    if (this.controls.angle < 35 && this.controls.angle >= 15) {
      fs1 += fs1 * Math.random();
    } else {
      fs1 = Math.max(fs1, 2 * Math.random());
    }

    let s: vec3 = vec3.fromValues(fs1, fs1, fs1);

    mat4.fromRotationTranslationScale(this.transform, this.quaternion, this.pos, s);
  }

  updateTransformUR() {
    let fs1 = 100;
    fs1 += fs1 * Math.random();
    let s: vec3 = vec3.fromValues(fs1, fs1, fs1);

    mat4.fromRotationTranslationScale(this.transform, this.quaternion, s, s);
  }

  copy() {
    let newPos: vec3 = vec3.create();
    vec3.copy(newPos, this.pos);

    let newUp: vec3 = vec3.create();
    vec3.copy(newUp, this.up);

    let newRight: vec3 = vec3.create();
    vec3.copy(newRight, this.right);

    let newForward: vec3 = vec3.create();
    vec3.copy(newForward, this.forward);

    let newScale: vec3 = vec3.create();
    vec3.copy(newScale, this.scale);

    let newQuat: quat = quat.create();
    quat.copy(newQuat, this.quaternion);

    let newt = new Turtle(newPos, newUp, newRight, newForward, newScale, newQuat, this.depth, this.controls);
    this.depth++;
    return newt;
  }

  scaleDown() {
    let amt = 1.05;
    let amt2 = 0.8;
    this.scale[0] /= amt;
    this.scale[1] /= amt2;
    this.scale[2] /= amt;
    this.stepSize[0] /= amt;
    this.stepSize[1] /= amt2;
    this.stepSize[2] /= amt;
  }

  scaleUp() {
    let amt = 1.05;
    let amt2 = 0.8;
    this.scale[0] *= amt;
    this.scale[1] *= amt2;
    this.scale[2] *= amt;
    this.stepSize[0] *= amt;
    this.stepSize[1] *= amt2;
    this.stepSize[2] *= amt;
  }

  moveForward() {
    let n = vec3.create();
    vec3.multiply(n, this.forward, this.stepSize);
    vec3.add(this.pos, this.pos, n);
    this.updateTransform();
    if (this.controls.angle < 35 && this.controls.angle >= 15) {
      return this.transform;
    }
  }
  addFlower() {
    this.updateTransformU();
    return this.transform;
  }

  moveForwardU() {
    let half = vec3.create();
    vec3.normalize(half, this.forward);
    let fs1 = this.controls.flower_scale;
    let s: vec3 = vec3.fromValues(fs1, fs1, fs1);
    vec3.multiply(half, half, s);
    vec3.max(half, this.stepSize, half);
    vec3.add(this.pos, this.pos, half);
    this.updateTransformU();
    return this.transform;
  }

  moveRight(neg: boolean = false, axis: vec3) {
    let n = vec3.create();
    let temp = vec3.create();
    let amt = 0.8;
    if (neg) {
      amt = -0.8;
    }
    vec3.multiply(temp, this.stepSize, vec3.fromValues(amt, amt, amt));
    vec3.multiply(n, this.right, temp);
    vec3.add(this.pos, this.pos, n);
    this.updateTransform();
    // return this.transform;
  }

  moveBackward() {
    vec3.subtract(this.pos, this.pos, this.forward);
    this.updateTransform();
    // return this.transform;
  }

  moveForwardH() {
    let half = vec3.create();
    vec3.divide(half, this.forward, vec3.fromValues(2, 2, 2));
    vec3.add(this.pos, this.pos, half);
    this.updateTransform();
    return this.transform;
  }

  //left and right
  rotatePos() {
    this.rotate(0, 1, 1);
  }

  rotateF() {
    let rand = Math.random();
    this.rotate(1.0 * rand, 1 * rand, 1 * rand, false, true);
  }

  //along y axis
  rotatePosY() {
    this.rotate(0, 1, 0);
  }

  //rotate for flower
  rotateFR() {
    let rand = Math.random();
    this.rotate(1.0 * rand, 1 * rand, 1 * rand, false, true);
    return this.transform;
  }

  rotateNeg() {
    this.rotate(0, 0, 1, true);
  }

  //pass in the axis
  rotate(x: number, y: number, z: number, neg: boolean = false, flower: boolean = false, deg: number = this.controls.angle) {
    if (neg) {
      deg = -deg;
    }
    if (flower) {
      deg *= 1 + 5.0 * Math.random();
    }
    let axis = vec3.fromValues(x, y, z);

    let q: quat = quat.create();
    quat.setAxisAngle(q, axis, toRadian(deg));

    let tempForward: vec4 = vec4.fromValues(this.forward[0], this.forward[1], this.forward[2], 0);
    vec4.transformQuat(tempForward, tempForward, q);
    this.forward = vec3.fromValues(tempForward[0], tempForward[1], tempForward[2]);

    let tempRight: vec4 = vec4.fromValues(this.right[0], this.right[1], this.right[2], 1.0);
    vec4.transformQuat(tempRight, tempRight, q);
    this.right = vec3.fromValues(tempRight[0], tempRight[1], tempRight[2]);

    // update quat
    quat.multiply(this.quaternion, q, this.quaternion);
    quat.normalize(this.quaternion, this.quaternion);
    // this.moveRight(neg, axis);
  }

  setTurtle(turtle: Turtle) {
    vec3.copy(this.pos, turtle.pos);
    vec3.copy(this.forward, turtle.forward);
    vec3.copy(this.up, turtle.up);
    vec3.copy(this.right, turtle.right);
    quat.copy(this.quaternion, turtle.quaternion);
    this.depth = turtle.depth - 1;
    this.controls = turtle.controls;
  }
}

export default Turtle;
