const canvas = document.querySelector("canvas");

if (!navigator.gpu) {
    throw new Error("WebGPU not supported on this browser");
}

const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
    throw new Error("No appropriate GPUAdapter found");
}

const device = await adapter.requestDevice();
if (!device) {
    throw new Error("Failed to retrieve GPUDevice");
}

// import('./render.js')

const context = canvas.getContext("webgpu");

{
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });
}

const encoder = device.createCommandEncoder();
// const texture = device.createTexture({
//     size: [500, 500],
//     format: 'rgba8unorm',
//     usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
// });

const pass = encoder.beginRenderPass({
    colorAttachments: [
        {
            view: context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: [0, 0, .4, 1],
            storeOp: "store",
        },
    ],
});

pass.end();

device.queue.submit([encoder.finish()]);