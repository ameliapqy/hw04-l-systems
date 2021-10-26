// Represent the result of mapping a particular character to a new set of characters 
// during the grammar expansion phase of the L-System
class ExpansionRule {
  precondition: string;
  postcondition: Map<number, string>; //<probability, new symbol>

  constructor(pre: string, post: Map<number, string>) {
    this.precondition = pre;
    this.postcondition = post;
  }
}
export default ExpansionRule;
