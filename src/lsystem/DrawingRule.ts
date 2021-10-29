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
  turtleStack: Turtle[] = [];
  controls: any;

  constructor(controls: any) {
    this.turtle = new Turtle(
      vec3.fromValues(0, 0, 0), //pos
      vec3.fromValues(0, 1, 0), //up
      vec3.fromValues(1, 0, 0), //right
      vec3.fromValues(0, 10, 0), //forward
      vec3.fromValues(1, 1, 1), //scale
      quat.fromValues(0, 1, 0, 0), //quat
      3, //recursion depth
      controls //control
    );
    this.turtleStack.push(this.turtle);
    //set up drawing rules
    this.rules.set('F', this.drawTrunk.bind(this));
    this.rules.set('X', this.drawFlowers.bind(this));
    this.rules.set('[', this.presave.bind(this));
    this.rules.set(']', this.save.bind(this));

    this.rules.set('X', this.turtle.moveForward.bind(this.turtle));

    this.rules.set('+', this.turtle.rotatePos.bind(this.turtle));
    this.rules.set('-', this.turtle.rotateNeg.bind(this.turtle));
  }
  //[
  presave() {
    this.turtleStack.push(this.turtle);
    let newt = this.turtle.copy();
    newt.depth = this.turtle.depth + 1;
    this.turtle = newt;
  }
  //]
  save() {
    this.turtleStack.pop();
  }

  draw(grammar: string) {
    for (let c of grammar) {
      let func: any = this.rules.get(c);
      if (func) {
        func();
      }
    }
  }

  toRadian(angle: number) {
    return (angle * Math.PI) / 180.0;
  }

  drawTrunk() {
    let t = this.turtle;
    //roatet cylinder so it faces forward
    t.rotateAngleAxis(this.toRadian(90.0), t.up);
    this.trunks.trans.push(t.pos[0], t.pos[1], t.pos[2]);
    this.trunks.scale.push(t.scale[0], t.scale[1], t.scale[2]);
    this.trunks.quat.push(t.quaternion[0], t.quaternion[1], t.quaternion[2]);
    this.trunks.count += 1;
    t.moveForward();
  }

  drawFlowers() {
    let t = this.turtle;
    //roatet cylinder so it faces forward
    t.rotateAngleAxis(this.toRadian(90.0), t.up);
    this.flowers.trans.push(t.pos[0], t.pos[1], t.pos[2]);
    this.flowers.scale.push(t.scale[0], t.scale[1], t.scale[2]);
    this.flowers.quat.push(t.quaternion[0], t.quaternion[1], t.quaternion[2]);
    this.flowers.count += 1;
    t.moveForward();
  }
}
export default DrawingRule;
