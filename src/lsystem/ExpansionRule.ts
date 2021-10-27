// Represent the result of mapping a particular character to a new set of characters
// during the grammar expansion phase of the L-System

//maintain a quaternion/ forward right
class ExpansionRule {
  precondition: string;
  postcondition: Map<string, any>; //<probability, new symbol>
  controls: any;

  constructor(controls: any) {
    this.precondition = 'F';
    this.postcondition = new Map();
    this.postcondition.set('F', this.expandTrunk);
  }

  expandTrunk() {
    return 'FF';
  }
}

export default ExpansionRule;
