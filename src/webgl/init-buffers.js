const initBuffers = (gl, video) => {
  // left right
  const positionsLR = [
    // 1
    0.5,
    0.0,
    // 2
    1.0,
    0.0,
    // 3
    0.5,
    1.0,
    // 4
    0.5,
    1.0,
    // 5
    1.0,
    0.0,
    // 6
    1.0,
    1.0,
  ];

  const positionsTB = [
    // 1
    0.0,
    0.0,
    // 2
    1.0,
    0.0,
    // 3
    0.0,
    1.0,
    // 4
    0.0,
    1.0,
    // 5
    1.0,
    0.0,
    // 6
    1.0,
    1.0,
  ];

  const positions = [
    // 1
    0.0,
    0.0,
    // 2
    1.0,
    0.0,
    // 3
    0.0,
    0.5,
    // 4
    0.0,
    0.5,
    // 5
    1.0,
    0.0,
    // 6
    1.0,
    0.5,
  ];

  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Set a rectangle the same size as the image.
  setRectangle(gl, 0, 0, video.videoWidth, video.videoHeight / 2);

  // Now create an array of positions for the square.

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  //   Texture
  const textureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    texture: textureBuffer,
  };
};

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
}

export default initBuffers;
