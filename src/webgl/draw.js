const draw = (gl, programInfo, buffers) => {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const resolutionLocation = gl.getUniformLocation(
    programInfo.program,
    'u_resolution'
  );

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(programInfo.program);

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  let offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    size,
    type,
    normalize,
    stride,
    offset
  );

  //  Texture

  // Turn on the texcoord attribute
  gl.enableVertexAttribArray(programInfo.attribLocations.texturePosition);

  // bind the texcoord buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texture);
  gl.vertexAttribPointer(
    programInfo.attribLocations.texturePosition,
    size,
    type,
    normalize,
    stride,
    offset
  );

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

  // Draw
  const primitiveType = gl.TRIANGLES;
  offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
};
export default draw;
