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
  recursionDepth: number;
  controls: any;

  constructor(controls: any) {
    this.expansionRule = new ExpansionRule(controls);
    this.drawingRule = new DrawingRule(controls);
    this.recursionDepth = 1;
    this.controls = controls;
  }

  //return VBO data to main
  draw() {
    let expandedStr = this.expansionRule.expandAxiom(this.recursionDepth);
    console.log('expandedStr: ' + expandedStr);
    //  let expandedStr = this.expansionRule.string;
    let transforms: any[] = this.drawingRule.draw(expandedStr);

    //init data
    let data: any = {};
    data.trunks = {};
    data.trunks.color = [];
    data.trunks.col1 = [];
    data.trunks.col2 = [];
    data.trunks.col3 = [];
    data.trunks.col4 = [];

    data.flowers = {};
    data.flowers.color = [];
    data.flowers.col1 = [];
    data.flowers.col2 = [];
    data.flowers.col3 = [];
    data.flowers.col4 = [];

    let type: string = '';

    for (let currData of transforms) {
      let transformation: mat4 = currData.transform;
      // console.log('curr data: ' + transformation);
      if (currData.char == 'X') {
        type = 'flowers';
        data[type].color.push(1);
        data[type].color.push(1);
        data[type].color.push(1);
        data[type].color.push(1);
      } else {
        type = 'trunks';
        data[type].color.push(0.5);
        data[type].color.push(0.4);
        data[type].color.push(0.4);
        data[type].color.push(1);
      }
      data[type].col1.push(transformation[0]);
      data[type].col1.push(transformation[1]);
      data[type].col1.push(transformation[2]);
      data[type].col1.push(transformation[3]);

      data[type].col2.push(transformation[4]);
      data[type].col2.push(transformation[5]);
      data[type].col2.push(transformation[6]);
      data[type].col2.push(transformation[7]);

      data[type].col3.push(transformation[8]);
      data[type].col3.push(transformation[9]);
      data[type].col3.push(transformation[10]);
      data[type].col3.push(transformation[11]);

      data[type].col4.push(transformation[12]);
      data[type].col4.push(transformation[13]);
      data[type].col4.push(transformation[14]);
      data[type].col4.push(transformation[15]);
    }
    return data;
  }
}

export default LSystem;
