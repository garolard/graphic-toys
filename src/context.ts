export function getCanvas(canvasId: string): HTMLCanvasElement {
    return document.getElementById(canvasId) as HTMLCanvasElement;
}

export function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    return canvas.getContext('2d');
}