import { vec3, vec4, mat4 } from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';

// Represent the result of mapping a character to an L-System drawing operation
// (possibly with multiple outcomes depending on a probability).
class DrawingRule {
  operation: any;
  controls: any;
  
  constructor(func: any) {
    this.operation = func;
  }
}
export default DrawingRule;
