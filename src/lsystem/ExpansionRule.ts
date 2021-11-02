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
    this.grammar.set('U', this.expandU());
  }

  //F = FF
  expandF() {
    return 'FF';
  }

  //X = +F+F-[[X]+X]+F[+FX]-X
  expandX() {
    return 'F+F-[[X]+X]+F[+FX]-X';
  }

  expandU() {
    return 'U';
  }

  expandAxiom(iter: number) {
    let result: string = this.axiom;

    for (let i = 0; i < iter; i++) {
      let curr: string = '';
      for (let old_sym of result) {
        let func = this.grammar.get(old_sym);
        console.log(old_sym);
        console.log(func);
        if (func) {
          curr += func;
          console.log('+func= ' + curr);
        } else {
          curr += old_sym;
          console.log('+old_sym= ' + curr);
        }
      }
      result = curr;
    }
    return result;
  }
}

export default ExpansionRule;
