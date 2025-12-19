console.log("Rendering.")

const device = (async function() {
    const adapter = await navigator.gpu.requestAdapter();
    return adapter.requestDevice();
})()

const canvas = document.querySelector("canvas");
const context = canvas.getContext("webgpu");

{
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });
};

const encoder = device.createCommandEncoder();
const texture = device.createTexture({
    size: [500, 500],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
});