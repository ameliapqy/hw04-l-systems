import { defaultCipherList } from 'constants';
import { vec3, vec4, mat4, quat } from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import Turtle from './Turtle';

// Represent the result of mapping a character to an L-System drawing operation
// (possibly with multiple outcomes depending on a probability).
class DrawingRule {
  rules: Map<string, any> = new Map();
  turtle: Turtle;
  turtleStack: Turtle[] = [];
  controls: any;

  constructor(controls: any) {
    this.turtle = new Turtle(
      vec3.fromValues(0, -25, 0), //pos
      vec3.fromValues(0, 1, 0), //up
      vec3.fromValues(1, 0, 0), //right
      vec3.fromValues(0, 2.5, 0), //forward
      vec3.fromValues(1, 1, 1), //scale
      quat.fromValues(0, 0, 0, 1), //quat
      3, //recursion depth
      controls //control
    );
    this.turtleStack.push(this.turtle);
    //set up drawing rules
    this.rules.set('[', this.presave.bind(this));
    this.rules.set(']', this.save.bind(this));

    this.rules.set('F', this.turtle.moveForward.bind(this.turtle));
    this.rules.set('X', this.turtle.moveForward.bind(this.turtle));
    this.rules.set('U', this.turtle.moveForwardU.bind(this.turtle));
    this.rules.set('T', this.turtle.moveForward.bind(this.turtle));
    this.rules.set('B', this.turtle.addFlower.bind(this.turtle));
    this.rules.set('A', this.turtle.moveBackward.bind(this.turtle));

    this.rules.set('+', this.turtle.rotatePos.bind(this.turtle));
    this.rules.set('/', this.turtle.rotateF.bind(this.turtle));
    this.rules.set('-', this.turtle.rotateNeg.bind(this.turtle));
    this.rules.set('1', this.turtle.scaleUp.bind(this.turtle));
    this.rules.set('0', this.turtle.scaleDown.bind(this.turtle));
  }

  //[
  presave() {
    let oldt = this.turtle.copy();
    this.turtleStack.push(oldt);
    let amt = 0.995;
    let amt2 = 0.99;
    this.turtle.scale[0] *= amt;
    this.turtle.scale[2] *= amt;
    this.turtle.scale[0] = Math.max(this.turtle.scale[0], 0.25);
    this.turtle.scale[2] = Math.max(this.turtle.scale[2], 0.25);
  }

  //]
  save() {
    let t: Turtle = this.turtleStack.pop();
    if (t) {
      this.turtle.setTurtle(t);
    }
  }

  toRadian(angle: number) {
    return (angle * Math.PI) / 180.0;
  }

  draw(str: string) {
    // console.log('string in draw:' + str);
    //dummy string for testing
    // str = 'FFB/B/B/B/B';
    let allData: any = [];
    allData.transforms = [];
    var i: number = 0;
    for (let char of str) {
      let currdata: any = {};
      currdata.transform = mat4.create();
      let func: any = this.rules.get(char);
      if (func) {
        let transformMat: any = func();
        if (transformMat) {
          let newMat: mat4 = mat4.create();
          mat4.copy(newMat, transformMat);
          currdata.transform = newMat;
          currdata.char = char;
          allData.push(currdata);
        }
      }
      if (char == '[') {
        this.presave();
      }
      if (char == ']') {
        this.save();
      }
    }
    return allData;
  }
}
export default DrawingRule;
