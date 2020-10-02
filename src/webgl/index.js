import initBuffers from './init-buffers';
import initShaderProgram from './program';
import { initTexture, updateTexture } from './texture';
import loadImage from './load-image';
import loadVideo from './load-video';
import draw from './draw';
import scs from '../videos/select-case-studies.mp4';

const main = async ref => {
  // Load image

  const video = await loadVideo(scs);
  console.log(video.videoHeight);

  // Ref
  const gl = ref.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: false, // Ask for non-premultiplied alpha
    preserveDrawingBuffer: false,
  });

  // If we don't have a GL context, give up now
  if (!gl) {
    alert(
      'Unable to initialize WebGL. Your browser or machine may not support it.'
    );
    return;
  }
  ref.width = video.videoWidth;
  ref.height = video.videoHeight / 2;

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
  // gl_FragColor = texture2D(u_image, v_texCoord);
  // Fragment shader program
  const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
  
      void main() {
          mediump vec3 tColor = texture2D(u_image, v_texCoord).rgb;
          mediump vec3 aColor = texture2D(u_image, (v_texCoord + vec2(0.0, 0.5))).rgb;
        
          gl_FragColor = vec4(tColor, aColor[0]);
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
  const buffers = initBuffers(gl, video);

  const texture = initTexture(gl, video);

  // Step 4
  // Draw the scene
  // draw(gl, programInfo, buffers);

  // Draw the scene repeatedly
  function render() {
    // now *= 0.001; // convert to seconds
    // const deltaTime = now - then;
    // then = now;
    updateTexture(gl, texture, video);

    draw(gl, programInfo, buffers);

    // requestAnimationFrame(render);
  }
  setInterval(() => {
    render();
  }, 50);
  // requestAnimationFrame(render);
};

export default main;
