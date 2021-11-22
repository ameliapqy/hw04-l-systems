// Represent the result of mapping a particular character to a new set of characters
// during the grammar expansion phase of the L-System

//maintain a quaternion/ forward right
class ExpansionRule {
  grammar: Map<string, any>; //<char to new char> //<probability, new symbol>
  string: string;
  axiom: any;
  controls: any;

  constructor(controls: any) {
    this.axiom = 'TAAAX5';
    this.grammar = new Map();
    this.grammar.set('F', this.expandF());
    this.grammar.set('X', this.expandX());
    this.grammar.set('U', this.expandU());
    this.grammar.set('T', this.expandT());
  }

  expandT() {
    return '11T0T0';
  }

  //F = FF
  expandF() {
    return 'F';
  }

  //X = +F+F-[[X]+X]+F[+FX]-X
  //'FF+[[FXU]+XU]+FF[+FXU]-XUU';
  expandX() {
    return 'FFF-[[FXU]+XU]+FF[+FXU]-XUU';
  }

  expandU() {
    let rand = Math.random();
    if (rand < 0.9) return 'B/B//B/B/B';
    else if (rand < 0.8) return 'B///B//B';
    else return '/U';
  }
  expandAxiom(iter: number) {
    let result: string = this.axiom;

    for (let i = 0; i < iter; i++) {
      let curr: string = '';
      for (let old_sym of result) {
        let func = this.grammar.get(old_sym);
        if (func) {
          curr += func;
        } else {
          curr += old_sym;
        }
      }
      result = curr;
    }
    console.log('expandedStr' + result);
    return result;
  }
}

export default ExpansionRule;
