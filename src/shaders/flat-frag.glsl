#version 300 es
precision highp float;

uniform vec3 u_Eye, u_Ref, u_Up;
uniform vec2 u_Dimensions;
uniform float u_Time;

in vec2 fs_Pos;
out vec4 out_Col;


//toolbox functions
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

#define NUM_OCTAVES 5

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.9; //0.5
  int o = NUM_OCTAVES;
	for (int i = 0; i < o; ++i) {
		v += a * noise(x);
		x = x * 2.25 + 2.0; //2.0
		a *= 0.55; //0.5
	}
	return v;
}

void main() {
  vec3 pos = vec3(fs_Pos,1.0);
  float warp_noise = fbm(pos.xyz + fbm( pos.xyz + fbm( pos.xyz )));

  out_Col = vec4(0.5 * (fs_Pos + vec2(1.0)), 0.0, 1.0) * warp_noise;
  out_Col += vec4(0.2,-0.1,0.8,0.0);
  //avg r,g,b
  float avg = (out_Col.r+out_Col.g+out_Col.b)/10.0;
  out_Col += vec4(avg,avg,avg,0.f);
  out_Col = min(out_Col,vec4(1,0.98,1,1.f));
}


