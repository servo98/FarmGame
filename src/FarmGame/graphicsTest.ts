export function start() {
  //   const BASE_VERTEX_SHADER = `
  //       attribute vec2 position;
  //       varying vec2 texCoords;

  //       void main() {
  //         texCoords = (position + 1.0) / 2.0;

  //         gl_Position = vec4(position, 0, 1.0);
  //       }
  //     `;

  //   const BASE_FRAGMENT_SHADER = `
  //       precision highp float;

  //       varying vec2 texCoords;
  //       uniform sampler2D textureSampler;

  //       void main() {
  //         // Define las coordenadas de textura para cambiar el tamaño de la imagen
  //         vec2 scaledTexCoords = texCoords * vec2(1.0, 1.0); // Cambia los valores 2.0 según el tamaño deseado

  //         vec2 invertedTexCoords = vec2(texCoords.x, 1.0 - texCoords.y);
  //         vec4 color = texture2D(textureSampler, invertedTexCoords);
  //         gl_FragColor = color;
  //       }
  //     `;

  const BASE_VERTEX_SHADER = `
    attribute vec2 position;
    varying vec2 texCoords;

    void main() {
      texCoords = position;
      gl_Position = vec4(position, 0, 1.0);
    }
  `;

  const BASE_FRAGMENT_SHADER = `
    precision highp float;
    
    varying vec2 texCoords;
    uniform sampler2D textureSampler;

    void main() {
      // Escala las coordenadas de textura para ajustar el tamaño deseado (por ejemplo, 0.5 para reducir a la mitad)
      vec2 scaledTexCoords = texCoords * vec2(1.0, 1.0); // Cambia los valores según el tamaño deseado
    //   vec2 invertedTexCoords = vec2(scaledTexCoords.x, 1.0 - scaledTexCoords.y);
      // Ajusta las coordenadas de textura para dibujar en la esquina inferior derecha
      vec2 cornerTexCoords = vec2(1.0 - scaledTexCoords.x, 1.0 - scaledTexCoords.y);
      
      vec4 color = texture2D(textureSampler, cornerTexCoords);
      gl_FragColor = color;
    }
  `;

  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = 'resources/TILE/test2.png';

  const desiredWidth = 100; // Cambia el ancho deseado
  const desiredHeight = 100; // Cambia la altura deseada

  image.onload = function () {
    // Get our canvas
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;
    const gl = canvas.getContext('webgl') as WebGLRenderingContext;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Create our vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(vertexShader, BASE_VERTEX_SHADER);
    gl.compileShader(vertexShader);

    // Create our fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fragmentShader, BASE_FRAGMENT_SHADER);
    gl.compileShader(fragmentShader);

    // Create our program
    const program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // Enable the program
    gl.useProgram(program);

    // Bind VERTICES as the active array buffer.
    const VERTICES = new Float32Array([
      0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

    // Set and enable our array buffer as the program's "position" variable
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    // Create a texture
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Configura la filtración "nearest-neighbor" para evitar el suavizado
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Dibuja la imagen en el tamaño deseado en el canvas
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
}
