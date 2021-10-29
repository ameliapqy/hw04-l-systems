// Represent the result of mapping a particular character to a new set of characters
// during the grammar expansion phase of the L-System

//maintain a quaternion/ forward right
class ExpansionRule {
  grammar: Map<string, any>; //<char to new char> //<probability, new symbol>
  string: string;
  axiom: any;
  controls: any;

  constructor(controls: any) {
    this.axiom = 'X';
    this.grammar = new Map();
    this.grammar.set('F', this.expandF());
    this.grammar.set('X', this.expandX());
  }

  //F = FF
  expandF() {
    return 'FF';
  }

  //X = +F+F-[[X]+X]+F[+FX]-X
  expandX() {
    return '+F+F-[[X]+X]+F[+FX]-X';
  }

  expandAxiom(iter: number) {
    let result: string = this.axiom;

    for (let i = 0; i < iter; i++) {
      let curr: string = '';
      for (let old_sym of result) {
        let func = this.grammar.get(old_sym);
        if (func) {
          curr += func();
        } else {
          curr += old_sym;
        }
      }
      result = curr;
    }
    return result;
  }
}

export default ExpansionRule;
