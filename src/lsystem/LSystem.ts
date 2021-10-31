import { vec3, vec4, mat4, quat } from 'gl-matrix';
import Turtle from './Turtle';
import ExpansionRule from './ExpansionRule';
import DrawingRule from './DrawingRule';
import ShaderProgram from '../rendering/gl/ShaderProgram';
import Mesh from '../geometry/Mesh';
import { readTextFile, toRadian } from '../globals';

class LSystem {
  expansionRule: ExpansionRule;
  drawingRule: DrawingRule;
  controls: any;
  recursionDepth: number;
  cylinder: Mesh;

  constructor(controls: any) {
    // this.turtle = new Turtle()
    this.expansionRule = new ExpansionRule(controls);
    this.drawingRule = new DrawingRule(controls);
    this.controls = controls;
    this.recursionDepth = 3;
    let cylinderObj: string = readTextFile('./src/obj/cylinder.obj');
    this.cylinder = new Mesh(cylinderObj, vec3.fromValues(0, 0, 0));
    this.cylinder.create();
  }

  draw() {
    // let expandedStr = this.expansionRule.expandAxiom(this.recursionDepth);
    //  let expandedStr = this.expansionRule.string;
    // this.drawingRule.draw(expandedStr);
    console.log(this.drawingRule);
    this.drawingRule.draw('FFFX');

    //set up instance VBOs
    let trunksTransform = this.drawingRule.trunks;
    //update vbo
    // this.cylinder.setInstanceVBOsTransform2(
    //   new Float32Array(trunksTransform.trans),
    //   new Float32Array(trunksTransform.quat),
    //   new Float32Array(trunksTransform.scale)
    // );

    this.cylinder.setNumInstances(trunksTransform.count);
    console.log(trunksTransform.count);
  }
}

export default LSystem;
