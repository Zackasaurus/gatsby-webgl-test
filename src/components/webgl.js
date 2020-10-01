export const init = video => {
  const vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main()',
    '{',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}',
  ].join('\n');

  const fragmentShaderText = [
    'precision mediump float;',
    '',
    'void main()',
    '{',
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}',
  ].join('\n');

  const gl = video.getContext('webgl');
  // console.log("p")
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Create shaders
  const vertextShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertextShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertextShader);
  if (!gl.getShaderParameter(vertextShader, gl.COMPILE_STATUS)) {
    console.error('VERTEX ERROR', gl.getShaderInfoLog(vertextShader));
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('FRAGMENT ERROR', gl.getShaderInfoLog(fragmentShader));
    return;
  }
  const program = gl.createProgram();
  gl.attachShader(program, vertextShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
  }

  // create buffer
  const triangleVertices = [
    // X, Y
    0.0,
    0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
  ];

  const triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(triangleVertices),
    gl.STATIC_DRAW
  );
  const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttribPointer(
    positionAttribLocation,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
  );

  gl.enableVertexAttribArray(positionAttribLocation);

  // render loop

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
