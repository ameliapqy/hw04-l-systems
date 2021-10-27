import { vec3, vec4, mat4, quat } from 'gl-matrix';
import Turtle from './Turtle';
import ExpansionRule from './ExpansionRule';
import DrawingRule from './DrawingRule';
import ShaderProgram from '../rendering/gl/ShaderProgram';

class LSystem {
  turtle: Turtle;
  turtleStack: Turtle[];
  expansionRule: ExpansionRule;
  drawingRule: DrawingRule;
  controls: any;

  constructur(controls: any) {
    // this.turtle = new Turtle()
    this.expansionRule = new ExpansionRule(controls);
    this.drawingRule = new DrawingRule(controls);
    this.controls = controls;
  }
}

export default LSystem;
