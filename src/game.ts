import * as Context from './context';

let mainCanvas: HTMLCanvasElement;
let mainContext: CanvasRenderingContext2D;
let desiredFps: number = 0;
let fpsInterval: number = 0;
let startTime: number = Date.now();
let gameObjects: GameObject[];

export interface GameObject {
    update(): void;
    paint(): void;
}

export function init() {
    mainCanvas = Context.getCanvas('main-canvas');
    mainContext = mainCanvas.getContext('2d');
    gameObjects = [];
}

export function entities() {
    return gameObjects;
}

export function addGameObject(gameObject: GameObject) {
    gameObjects.push(gameObject);
}

export function getCanvas() {
    return mainCanvas;
}

export function getContext() {
    return mainContext;
}

export function setDesiredFps(fps: number) {
    desiredFps = fps;
    fpsInterval = 1000 / desiredFps;
}

export function setFrameStartTime(now: number) {
    startTime = now;
}

export function getFrameDuration(): number {
    const now = Date.now();
    return now - startTime;
}

export function getFpsInterval(): number {
    return fpsInterval;
}