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
    mat4.fromRotationTranslationScale(this.transform, this.quaternion, this.pos, this.scale);
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

    let newt = new Turtle(newPos, newUp, newRight, newForward, newScale, newQuat, this.depth++, this.controls);
    return newt;
  }

  moveForward() {
    //update forward vector
    vec3.add(this.pos, this.pos, this.forward);
    //update forward vector
    this.updateTransform();
    return this.transform;
  }

  moveRight() {
    //update forward vector
    vec3.add(this.pos, this.pos, this.right);
    //update forward vector
    this.updateTransform();
    return this.transform;
  }

  moveBackward() {
    vec3.subtract(this.pos, this.pos, this.forward);
    //update forward vector
    this.updateTransform();
    return this.transform;
  }

  moveForwardH() {
    let half = vec3.create();
    vec3.divide(half, this.forward, vec3.fromValues(2, 2, 2));
    vec3.add(this.pos, this.pos, half);
    //update forward vector
    this.updateTransform();
    return this.transform;
  }

  //front and back
  rotatePos(deg: number = 25) {
    this.rotate(0, 0, deg);
    this.updateTransform();
    return this.transform;
  }

  //along y axis
  rotatePosY(deg: number = 45) {
    this.rotate(0, deg, 0);
    this.updateTransform();
    return this.transform;
  }

  //along z axis
  rotatePosZ(deg: number = 45) {
    this.rotate(0, 0, deg);
    this.updateTransform();
    return this.transform;
  }

  rotateNeg(deg: number = 25) {
    this.rotate(0, 0, -deg);
    this.updateTransform();
    return this.transform;
  }

  rotate(x: number, y: number, z: number) {
    let multQuat: quat = quat.create();
    //Creates a quaternion from the given euler angle x, y, z (in degree)
    //translation
    quat.fromEuler(multQuat, x, y, z);
    quat.multiply(this.quaternion, this.quaternion, multQuat);

    let tempForward: vec4 = vec4.fromValues(this.forward[0], this.forward[1], this.forward[2], 1.0);
    let rotMat: mat4 = mat4.create();
    mat4.fromQuat(rotMat, this.quaternion);
    vec4.transformMat4(tempForward, tempForward, rotMat);
    this.forward = vec3.fromValues(tempForward[0], tempForward[1], tempForward[2]);

    // let tempRight: vec4 = vec4.fromValues(this.right[0], this.right[1], this.right[2], 1.0);
    // let rotMat2: mat4 = mat4.create();
    // mat4.fromQuat(rotMat, this.quaternion);
    // vec4.transformMat4(tempRight, tempRight, rotMat2);
    // this.right = vec3.fromValues(tempRight[0], tempRight[1], tempRight[2]);

    // this.moveForward();
    this.moveRight();
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
