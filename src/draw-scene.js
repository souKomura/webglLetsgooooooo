
import { mat4 } from "gl-matrix";
function drawScene(gl, programInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const proj = mat4.create();
    mat4.perspective(proj, Math.PI/4.0, gl.canvas.clientWidth/gl.canvas.clientHeight, 0.1, 100.0);

    const model = mat4.create();

    mat4.translate(model, model, [0.0, 0.0, -6.0]);

    serPositionAttribute(gl, buffers, programInfo);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, proj);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelMatrix, false, model);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function serPositionAttribute(gl, buffers, programInfo){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

export {drawScene};