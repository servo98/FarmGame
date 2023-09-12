// // const canvas = document.getElementById('miCanvas') as HTMLCanvasElement;
// // const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// const orthographic = (
//   left: number,
//   right: number,
//   bottom: number,
//   top: number,
//   near: number,
//   far: number,
//   dst?: Float32Array,
// ) => {
//   dst = dst || new Float32Array(16);

//   dst[0] = 2 / (right - left);
//   dst[1] = 0;
//   dst[2] = 0;
//   dst[3] = 0;
//   dst[4] = 0;
//   dst[5] = 2 / (top - bottom);
//   dst[6] = 0;
//   dst[7] = 0;
//   dst[8] = 0;
//   dst[9] = 0;
//   dst[10] = 2 / (near - far);
//   dst[11] = 0;
//   dst[12] = (left + right) / (left - right);
//   dst[13] = (bottom + top) / (bottom - top);
//   dst[14] = (near + far) / (near - far);
//   dst[15] = 1;

//   return dst;
// };

// const translate = (
//   m: Float32Array,
//   tx: number,
//   ty: number,
//   tz: number,
//   dst?: Float32Array,
// ) => {
//   // This is the optimized version of
//   // return multiply(m, translation(tx, ty, tz), dst);
//   dst = dst || new Float32Array(16);

//   const m00 = m[0];
//   const m01 = m[1];
//   const m02 = m[2];
//   const m03 = m[3];
//   const m10 = m[1 * 4 + 0];
//   const m11 = m[1 * 4 + 1];
//   const m12 = m[1 * 4 + 2];
//   const m13 = m[1 * 4 + 3];
//   const m20 = m[2 * 4 + 0];
//   const m21 = m[2 * 4 + 1];
//   const m22 = m[2 * 4 + 2];
//   const m23 = m[2 * 4 + 3];
//   const m30 = m[3 * 4 + 0];
//   const m31 = m[3 * 4 + 1];
//   const m32 = m[3 * 4 + 2];
//   const m33 = m[3 * 4 + 3];

//   if (m !== dst) {
//     dst[0] = m00;
//     dst[1] = m01;
//     dst[2] = m02;
//     dst[3] = m03;
//     dst[4] = m10;
//     dst[5] = m11;
//     dst[6] = m12;
//     dst[7] = m13;
//     dst[8] = m20;
//     dst[9] = m21;
//     dst[10] = m22;
//     dst[11] = m23;
//   }

//   dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
//   dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
//   dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
//   dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

//   return dst;
// };

// const scale = (
//   m: Float32Array,
//   sx: number,
//   sy: number,
//   sz: number,
//   dst?: Float32Array,
// ) => {
//   // This is the optimized version of
//   // return multiply(m, scaling(sx, sy, sz), dst);
//   dst = dst || new Float32Array(16);

//   dst[0] = sx * m[0 * 4 + 0];
//   dst[1] = sx * m[0 * 4 + 1];
//   dst[2] = sx * m[0 * 4 + 2];
//   dst[3] = sx * m[0 * 4 + 3];
//   dst[4] = sy * m[1 * 4 + 0];
//   dst[5] = sy * m[1 * 4 + 1];
//   dst[6] = sy * m[1 * 4 + 2];
//   dst[7] = sy * m[1 * 4 + 3];
//   dst[8] = sz * m[2 * 4 + 0];
//   dst[9] = sz * m[2 * 4 + 1];
//   dst[10] = sz * m[2 * 4 + 2];
//   dst[11] = sz * m[2 * 4 + 3];

//   if (m !== dst) {
//     dst[12] = m[12];
//     dst[13] = m[13];
//     dst[14] = m[14];
//     dst[15] = m[15];
//   }

//   return dst;
// };

// const gl = twgl.getWebGLContext(document.getElementById("c"));
// const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

// // a unit quad
// const arrays = {
//   position: {
//     numComponents: 2,
//     data: [
//       0, 0,
//       1, 0,
//       0, 1,
//       0, 1,
//       1, 0,
//       1, 1,
//     ],
//   },
// };
// const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

// // create a texture using a canvas so we don't have to download one
// const ctx = document.createElement("canvas").getContext("2d");
// ctx.fillStyle = "blue";
// ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// ctx.lineWidth = 20;
// ["red", "orange", "yellow"].forEach(function(color, ndx, array) {
//   ctx.strokeStyle = color;
//   ctx.beginPath();
//   ctx.arc((ndx + 1) / (array.length + 1) * ctx.canvas.width, ctx.canvas.height / 2, ctx.canvas.height * 0.4, 0, Math.PI * 2, false);
//   ctx.stroke();
// });
// ctx.fillStyle = "white";
// ctx.font = "40px sans-serif";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.fillText("DrawImage", ctx.canvas.width / 2, ctx.canvas.height / 2);

// const ctx2 = document.getElementById("c2").getContext("2d");

// const tex = twgl.createTexture(gl, { src: ctx.canvas });
// const texWidth  = ctx.canvas.width;
// const texHeight = ctx.canvas.height;

// // we pass in texWidth and texHeight because unlike images
// // we can't look up the width and height of a texture

// // we pass in targetWidth and targetHeight to tell it
// // the size of the thing we're drawing too. We could look
// // up the size of the canvas with gl.canvas.width and
// // gl.canvas.height but maybe we want to draw to a framebuffer
// // etc.. so might as well pass those in.

// // srcX, srcY, srcWidth, srcHeight are in pixels
// // computed from texWidth and texHeight

// // dstX, dstY, dstWidth, dstHeight are in pixels
// // computed from targetWidth and targetHeight
// function drawImage(
//     tex, texWidth, texHeight,
//     srcX, srcY, srcWidth, srcHeight,
//     dstX, dstY, dstWidth, dstHeight,
//     targetWidth, targetHeight) {
//   const mat  = m4.identity();
//   const tmat = m4.identity();

//   const uniforms = {
//     matrix: mat,
//     textureMatrix: tmat,
//     texture: tex,
//   };

//   // these adjust the unit quad to generate texture coordinates
//   // to select part of the src texture

//   // NOTE: no check is done that srcX + srcWidth go outside of the
//   // texture or are in range in any way. Same for srcY + srcHeight

//   m4.translate(tmat, [srcX / texWidth, srcY / texHeight, 0], tmat);
//   m4.scale(tmat, [srcWidth / texWidth, srcHeight / texHeight, 1], tmat);

//   // these convert from pixels to clip space
//   m4.translate(mat, [-1, 1, 0], mat);
//   m4.scale(mat, [2 / targetWidth, -2 / targetHeight, 1], mat);

//   // these move and scale the unit quad into the size we want
//   // in the target as pixels
//   m4.translate(mat, [dstX, dstY, 0], mat);
//   m4.scale(mat, [dstWidth, dstHeight, 1], mat);

//   gl.useProgram(programInfo.program);
//   twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
//   twgl.setUniforms(programInfo, uniforms);
//   twgl.drawBufferInfo(gl, gl.TRIANGLES, bufferInfo);

// }

// function render(time) {
//   time *= 0.001;
//   const targetWidth  = gl.canvas.width;
//   const targetHeight = gl.canvas.height;

//   // pick some constious src rects and dst rects
//   const srcX = Math.abs(Math.sin(time * 1   )) * texWidth;
//   const srcY = Math.abs(Math.sin(time * 1.81)) * texHeight;
//   const srcWidth  = (texWidth  - srcX) * Math.abs(Math.sin(time * 2.12));
//   const srcHeight = (texHeight - srcY) * Math.abs(Math.sin(time * 1.53));

//   const dstX = Math.abs(Math.sin(time * 0.34)) * targetWidth;
//   const dstY = Math.abs(Math.sin(time * 2.75)) * targetHeight;
//   const dstWidth  = (targetWidth  - dstX) * Math.abs(Math.sin(time * 1.16));
//   const dstHeight = (targetHeight - dstY) * Math.abs(Math.sin(time * 1.17));

//   drawImage(
//     tex, texWidth, texHeight,
//     srcX, srcY, srcWidth, srcHeight,
//     dstX, dstY, dstWidth, dstHeight,
//     targetWidth, targetHeight);

//   ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
//   ctx2.drawImage(
//     ctx.canvas,
//     srcX, srcY, srcWidth, srcHeight,
//     dstX, dstY, dstWidth, dstHeight);

//   requestAnimationFrame(render);
// }
// requestAnimationFrame(render);
