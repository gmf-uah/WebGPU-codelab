console.log("Rendering.")

const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");

{
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });
};

const encoder = device.createCommandEncoder();