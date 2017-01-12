function hello() {
    const mainCanvas: HTMLCanvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = mainCanvas.getContext('2d');
    const size = {
        width: mainCanvas.width,
        height: mainCanvas.height
    };

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(size.width / 2 - 25, size.height / 2 - 25, 50, 50);
}

window.requestAnimationFrame(hello);