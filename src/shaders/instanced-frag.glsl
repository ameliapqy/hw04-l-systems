#version 300 es
precision highp float;

in vec4 fs_Col;
in vec4 fs_Pos;
in vec4 fs_Nor;

out vec4 out_Col;

void main()
{
    // float dist = 1.0 - (length(fs_Pos.xyz) * 2.0);
    // out_Col = vec4(dist) * fs_Col;

    //lambert
    vec3 dir = vec3(5, 5, 5) - fs_Pos.xyz;
	float diffuseTerm = dot(normalize(fs_Nor.xyz), normalize(dir));
	diffuseTerm = clamp(diffuseTerm, 0.0, 1.0);
	float ambientTerm = 0.2;

	float lightIntensity = diffuseTerm + ambientTerm;
	out_Col =  clamp(vec4(fs_Col.rgb * lightIntensity, 1.0), 0.0, 1.0);
}




