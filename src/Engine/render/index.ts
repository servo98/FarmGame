// // Get a reference to the canvas element
// const canvas = document.getElementById('canvas') as HTMLCanvasElement;

// // Get the WebGL context
// const gl = canvas.getContext('webgl') as WebGL2RenderingContext;

// if (!gl) {
//   console.error('WebGL is not available in this browser.');
//   // Handle the case where WebGL is not available
// }

// // Vertex shader source code
// const vsSource = `
//   attribute vec2 a_position;
//   attribute vec2 a_texCoord;
//   varying vec2 v_texCoord;

//   void main() {
//     gl_Position = vec4(a_position, 0.0, 1.0);
//     v_texCoord = a_texCoord;
//   }
// `;

// // Fragment shader source code
// const fsSource = `
//   precision mediump float;
//   uniform sampler2D u_image;
//   varying vec2 v_texCoord;

//   void main() {
//     gl_FragColor = texture2D(u_image, v_texCoord);
//   }
// `;

// // Create shaders, link program, and use it
// const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
// const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
// const program = createProgram(gl, vertexShader, fragmentShader);
// gl.useProgram(program);

// // Create a buffer for the square's positions and textures
// const positionBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];

// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// const texCoordBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

// const texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];

// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

// // Create a texture and bind it
// const texture = gl.createTexture();
// gl.bindTexture(gl.TEXTURE_2D, texture);

// // Set the parameters for the texture
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

// // Upload the image data to the texture
// const image = new Image();
// image.onload = function () {
//   gl.bindTexture(gl.TEXTURE_2D, texture);
//   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
//   drawScene();
// };
// image.src = 'your_image_url.jpg';

// // Set up the attributes and uniforms
// const positionLocation = gl.getAttribLocation(program, 'a_position');
// const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
// const imageLocation = gl.getUniformLocation(program, 'u_image');

// gl.enableVertexAttribArray(positionLocation);
// gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// gl.enableVertexAttribArray(texCoordLocation);
// gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
// gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

// gl.uniform1i(imageLocation, 0); // Set the texture unit to 0

// // Function to draw the image
// function drawScene() {
//   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the square
// }
// function createShader(
//   gl: WebGL2RenderingContext,
//   VERTEX_SHADER: number,
//   vsSource: string,
// ) {
//   throw new Error('Function not implemented.');
// }

// function createProgram(
//   gl: WebGL2RenderingContext,
//   vertexShader: any,
//   fragmentShader: any,
// ): WebGLProgram {
//   throw new Error('Function not implemented.');
// }
