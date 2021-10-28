import { defaultCipherList } from 'constants';
import { vec3, vec4, mat4, quat } from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import Turtle from './Turtle';

//store the trnasform info of each instances
export class Instance {
  count: number = 0;
  trans: number[] = [];
  scale: number[] = [];
  quat: number[] = [];
}
// Represent the result of mapping a character to an L-System drawing operation
// (possibly with multiple outcomes depending on a probability).
class DrawingRule {
  trunks: Instance = new Instance();
  flowers: Instance = new Instance();

  rules: Map<string, any> = new Map();
  turtle: Turtle;
  turtleStack: Turtle[];
  controls: any;

  constructor(controls: any) {
    this.turtle = new Turtle(
      vec3.fromValues(0, 0, 0), //pos
      vec3.fromValues(0, 1, 0), //up
      vec3.fromValues(1, 0, 0), //right
      vec3.fromValues(0, 1, 0), //forward
      quat.fromValues(0, 1, 0, 0), //quat
      3, //recursion depth
      controls //control
    );
    this.turtleStack.push(this.turtle);
    //set up drawing rules
    this.rules.set('F', this.turtle.moveForward.bind(this.turtle));
    this.rules.set('X', this.turtle.moveForward.bind(this.turtle));

    this.rules.set('+', this.turtle.rotatePos.bind(this.turtle));
    this.rules.set('-', this.turtle.rotateNeg.bind(this.turtle));
  }

  draw(grammar: string) {
    //   for(i : grammar){
    //         cylinder.setInstanceVBOTransform(new Float32Array(trans),new Float32Array(quat),new Float32Array(scale));
    // cylinder.setNumInstances(count);
    // }
  }

  toRadian(angle: number) {
    return (angle * Math.PI) / 180.0;
  }

  drawTrunk() {
    let t = this.turtle;
    //roatet cylinder so it faces forward
    t.rotateAngleAxis(this.toRadian(90.0), t.up);
  }
}
export default DrawingRule;
