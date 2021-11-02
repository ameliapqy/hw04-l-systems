import { defaultCipherList } from 'constants';
import { vec3, vec4, mat4, quat } from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import Turtle from './Turtle';

//store the trnasform info of each instances
export class Instance {
  count: number = 0;
  col1: number[] = [];
  col2: number[] = [];
  col3: number[] = [];
  col4: number[] = [];
  color: number[] = [];
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
      vec3.fromValues(0, -10, 0), //pos
      vec3.fromValues(0, 1, 0), //up
      vec3.fromValues(1, 0, 0), //right
      vec3.fromValues(0, 6, 0), //forward
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
    this.rules.set('U', this.turtle.moveForward.bind(this.turtle));
    this.rules.set('B', this.turtle.moveBackward.bind(this.turtle));

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
    this.turtle = this.turtleStack[0];
    console.log(this.turtle);
  }

  toRadian(angle: number) {
    return (angle * Math.PI) / 180.0;
  }

  draw(str: string) {
    // console.log('string in draw:' + str);
    //dummy string for testing
    str = 'FFFF[+F]FFFF';
    // str = 'BFFFFF+FFFFFFU';
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

  drawFlowers(str: string) {
    let flowers: any[] = [];
    // let t = this.turtle;
    // //roatet cylinder so it faces forward
    // t.rotateAngleAxis(this.toRadian(90.0), t.up);
    // this.flowers.trans.push(t.pos[0], t.pos[1], t.pos[2]);
    // this.flowers.scale.push(t.scale[0], t.scale[1], t.scale[2]);
    // this.flowers.quat.push(t.quaternion[0], t.quaternion[1], t.quaternion[2]);
    // this.flowers.count += 1;
    // t.moveForward();
    return flowers;
  }
}
export default DrawingRule;
