// #version 300 es
// precision highp float;

// in vec4 fs_Col;
// in vec4 fs_Pos;
// in vec4 fs_Nor;

// out vec4 out_Col;

// in vec4 vs_Transform1;

// void main()
// {
//     // float dist = 1.0 - (length(fs_Pos.xyz) * 2.0);
//     // out_Col = vec4(dist) * fs_Col;

//     //lambert
//   vec3 dir = vec3(10,100,10) - fs_Pos.xyz;
// 	float diffuseTerm = dot(normalize(fs_Nor.xyz), normalize(dir));
// 	diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);
// 	float ambientTerm = 0.5;

// 	float lightIntensity = diffuseTerm + ambientTerm;
// 	out_Col =  clamp(vec4(fs_Col.rgb * lightIntensity, 1.0), 0.0, 1.0);
// 	// out_Col = vs_Transform1;
// }




#version 150

in vec2 fs_UV;

out vec4 out_Col;

uniform sampler2D u_RenderedTexture;
uniform ivec2 u_Dimensions;

void main()
{
    //detects & enhances the edges of shapes in 3D scene
    //compute approximate gradient color of each pixel
    //matrix for horizontal gradient
    mat3 H = mat3(3,10,3,
                  0,0,0,
                  -3,-10,-3);

    //matrix for vertical gradient
    mat3 V = mat3(3,0,3,
                  10,0,-10,
                  -3,0,-3);

    //multiply each of matrices by 3x3 set of pixels surrounding a pixel
    //set pixel color to length of 2D gradient(sqrt of sum of both gradients squared)
    vec3 currC = vec3(0.0);
    float unitx = 1.0 / (u_Dimensions.x);
    float unity = 1.0 / (u_Dimensions.y);
    vec3 HSum = vec3(0.0);
    vec3 VSum = vec3(0.0);
    for(int y = -1; y <= 1; y++){
        for(int x = -1; x <= 1; x++){
            vec2 uv = vec2(fs_UV.x + unitx * float(x),
                           fs_UV.y + unity * float(y));
            currC = fs_Col.rgb;
            vec3 H2 = H[x+1][y+1] * currC;
            vec3 V2 = V[x+1][y+1] * currC;
             HSum += H2;
             VSum += H2;

        }
    }
    out_Col = vec4(sqrt(HSum * HSum + VSum * VSum),1.0);


}