import { gl } from '../../globals';

abstract class Drawable {
  count: number = 0;

  bufIdx: WebGLBuffer;
  bufPos: WebGLBuffer;
  bufNor: WebGLBuffer;
  bufTranslate: WebGLBuffer;
  bufCol: WebGLBuffer;
  bufUV: WebGLBuffer;

  bufCol1: WebGLBuffer;
  bufCol2: WebGLBuffer;
  bufCol3: WebGLBuffer;
  bufCol4: WebGLBuffer;

  //new buffers
  bufQuat: WebGLBuffer;
  bufScale: WebGLBuffer;

  idxGenerated: boolean = false;
  posGenerated: boolean = false;
  norGenerated: boolean = false;
  colGenerated: boolean = false;
  col1Generated: boolean = false;
  col2Generated: boolean = false;
  col3Generated: boolean = false;
  col4Generated: boolean = false;

  translateGenerated: boolean = false;
  uvGenerated: boolean = false;
  quatGenerated: boolean = false;
  scaleGenerated: boolean = false;

  numInstances: number = 0; // How many instances of this Drawable the shader program should draw

  abstract create(): void;

  destory() {
    gl.deleteBuffer(this.bufIdx);
    gl.deleteBuffer(this.bufPos);
    gl.deleteBuffer(this.bufNor);
    gl.deleteBuffer(this.bufCol);
    gl.deleteBuffer(this.bufTranslate);
    gl.deleteBuffer(this.bufCol1);
    gl.deleteBuffer(this.bufCol2);
    gl.deleteBuffer(this.bufCol3);
    gl.deleteBuffer(this.bufCol4);
    gl.deleteBuffer(this.bufUV);
    gl.deleteBuffer(this.bufQuat);
    gl.deleteBuffer(this.bufScale);
  }

  generateIdx() {
    this.idxGenerated = true;
    this.bufIdx = gl.createBuffer();
  }

  generatePos() {
    this.posGenerated = true;
    this.bufPos = gl.createBuffer();
  }

  generateNor() {
    this.norGenerated = true;
    this.bufNor = gl.createBuffer();
  }

  generateCol() {
    this.colGenerated = true;
    this.bufCol = gl.createBuffer();
  }

  generateCol1() {
    this.col1Generated = true;
    this.bufCol1 = gl.createBuffer();
  }

  generateCol2() {
    this.col2Generated = true;
    this.bufCol2 = gl.createBuffer();
  }

  generateCol3() {
    this.col3Generated = true;
    this.bufCol3 = gl.createBuffer();
  }

  generateCol4() {
    this.col4Generated = true;
    this.bufCol4 = gl.createBuffer();
  }

  generateTranslate() {
    this.translateGenerated = true;
    this.bufTranslate = gl.createBuffer();
  }

  generateUV() {
    this.uvGenerated = true;
    this.bufUV = gl.createBuffer();
  }

  generateQuat() {
    this.quatGenerated = true;
    this.bufQuat = gl.createBuffer();
  }

  generateScale() {
    this.scaleGenerated = true;
    this.bufScale = gl.createBuffer();
  }

  bindIdx(): boolean {
    if (this.idxGenerated) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    }
    return this.idxGenerated;
  }

  bindPos(): boolean {
    if (this.posGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    }
    return this.posGenerated;
  }

  bindNor(): boolean {
    if (this.norGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    }
    return this.norGenerated;
  }

  bindCol(): boolean {
    if (this.colGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCol);
    }
    return this.colGenerated;
  }

  bindTranslate(): boolean {
    if (this.translateGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTranslate);
    }
    return this.translateGenerated;
  }

  bindUV(): boolean {
    if (this.uvGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufUV);
    }
    return this.uvGenerated;
  }

  bindQuat(): boolean {
    if (this.quatGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufQuat);
    }
    return this.quatGenerated;
  }

  bindScale(): boolean {
    if (this.scaleGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufScale);
    }
    return this.scaleGenerated;
  }

  elemCount(): number {
    return this.count;
  }

  drawMode(): GLenum {
    return gl.TRIANGLES;
  }

  setNumInstances(num: number) {
    this.numInstances = num;
  }
}

export default Drawable;
