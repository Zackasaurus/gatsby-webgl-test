import initBuffers from './init-buffers';
import initShaderProgram from './program';
// import initTexture from './init-texture';
import loadImage from './load-image';
import draw from './draw';

const main = async video => {
  // Load image

  const image = await loadImage();

  // Ref
  const gl = video.getContext('webgl');

  // If we don't have a GL context, give up now
  if (!gl) {
    alert(
      'Unable to initialize WebGL. Your browser or machine may not support it.'
    );
    return;
  }
  video.width = image.width;
  video.height = image.height;

  // Vertex shader program
  const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;

      uniform vec2 u_resolution;

      varying vec2 v_texCoord;
      
      void main() {
        vec2 zeroToOne = a_position / u_resolution;

        vec2 zeroToTwo = zeroToOne * 2.0;
     
        vec2 clipSpace = zeroToTwo - 1.0;
     
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        v_texCoord = a_texCoord;
      }
    `;

  // Fragment shader program
  const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
  
      void main() {
          gl_FragColor = texture2D(u_image, v_texCoord);
      }
    `;

  // Step 1
  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Step 2
  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'a_position'),
      texturePosition: gl.getAttribLocation(shaderProgram, 'a_texCoord'),
    },
  };

  // Step 3
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl, image);

  // Create a texture.
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // Step 4
  // Draw the scene
  draw(gl, programInfo, buffers);
};

export default main;
