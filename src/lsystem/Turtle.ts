import { vec3, vec4, mat4 } from 'gl-matrix';

class Turtle {
  pos: vec3 = vec3.create();
  up: vec3 = vec3.create();
  right: vec3 = vec3.create();
  forward: vec3 = vec3.create();
  depth: number = 0;
  stepSize: number = 1;

  constructor(pos: vec3, up: vec3, right: vec3, forward: vec3) {
    this.pos = pos;
    this.up = up;
    this.right = right;
    this.forward = forward;
  }

  moveForward() {
    vec3.scaleAndAdd(this.pos, this.pos, this.forward, this.stepSize);
  }

  rotateAboutForward(deg: number) {
    deg = (deg * Math.PI) / 180.0;
    let rot = mat4.create();
  }
}

export default Turtle;
