
import {initBuffers} from "./init-buffers.js";
import {drawScene} from "./draw-scene.js";

function loadShader(gl, type, source){
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        alert(`failed compile shader: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function initShaderProgram(gl, vsSource, fsSource){
    const vert = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const frag = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vert);
    gl.attachShader(shaderProgram, frag);

    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        alert(`failed initialize shader program ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }

    return shaderProgram;
}

function main(){
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl");

    if(!gl){
        alert("failed initialize webGL");
        return;
    }

    const vsSource = `
        attribute vec4 aPos;
        uniform mat4 model;
        uniform mat4 proj;
        void main() {
            gl_Position = proj * model * aPos;
        }
    `;

    const fsSource = `
        void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    const shader = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shader,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shader, "aPos"),
        },
        uniformLocations: {
            modelMatrix: gl.getUniformLocation(shader, "model"),
            projectionMatrix: gl.getUniformLocation(shader, "proj")
        }
    }

    const buffers = initBuffers(gl);
    drawScene(gl, programInfo, buffers);
}

window.onload = main;