import { vec3, vec4, mat4, quat } from 'gl-matrix';
import Turtle from './Turtle';
import ExpansionRule from './ExpansionRule';
import DrawingRule from './DrawingRule';
import ShaderProgram from '../rendering/gl/ShaderProgram';
import Mesh from '../geometry/Mesh';

class LSystem {
  expansionRule: ExpansionRule;
  drawingRule: DrawingRule;
  controls: any;
  recursionDepth: number;
  cylinder: Mesh;

  constructur(controls: any) {
    // this.turtle = new Turtle()
    this.expansionRule = new ExpansionRule(controls);
    this.drawingRule = new DrawingRule(controls);
    this.controls = controls;
    this.recursionDepth = 3;
  }

  draw() {
    // let expandedStr = this.expansionRule.expandAxiom(this.recursionDepth);
    //  let expandedStr = this.expansionRule.string;
    // this.drawingRule.draw(expandedStr);
    this.drawingRule.draw('FF');

    //set up instance VBOs
    let trunksTransform = this.drawingRule.trunks;
    //update vbo
    this.cylinder.setInstanceVBOTransform(
      new Float32Array(trunksTransform.trans),
      new Float32Array(trunksTransform.quat),
      new Float32Array(trunksTransform.scale)
    );
    this.cylinder.setNumInstances(trunksTransform.count);
  }
}

export default LSystem;
