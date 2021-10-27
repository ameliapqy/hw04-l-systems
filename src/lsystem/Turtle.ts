import { vec3, vec4, mat4 } from 'gl-matrix';
// import { fromValues } from 'gl-matrix/src/gl-matrix/vec2';

class Turtle {
  pos: vec3 = vec3.create();
  up: vec3 = vec3.create();
  right: vec3 = vec3.create();
  forward: vec3 = vec3.create();
  depth: number = 0;
  stepSize: number = 1;

  constructor(pos: vec3 = vec3.fromValues(0, 0, 0), up: vec3 = vec3.fromValues(0, 1, 0), right: vec3, forward: vec3) {
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
