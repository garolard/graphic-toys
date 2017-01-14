import { Size } from './foundation';

let mainStage: Stage;
let desiredFps: number = 0;
let fpsInterval: number = 0;
let startTime: number = Date.now();

export interface Stage {
    update(): void;
    paint(): void;
}

export interface Actor {
    isAlive: boolean;
    update(stageBounds: Size): void;
    paint(context: CanvasRenderingContext2D): void;
}

export class BasicStage implements Stage {
    private bounds: Size;
    private actors: Actor[];
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public initForCanvas(mainCanvas: string) {
        this.canvas = document.getElementById(mainCanvas) as HTMLCanvasElement;
        this.context = (document.getElementById(mainCanvas) as HTMLCanvasElement).getContext('2d');
        this.actors = new Array<Actor>();
        this.bounds = {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    public clear() {
        this.context.clearRect(0, 0, this.bounds.width, this.bounds.height);
        this.context.fillStyle = 'rgb(0,0,0)'; // Y si el usuario quiere usar otra cosa de fondo???
        this.context.fillRect(0, 0, this.bounds.width, this.bounds.height);
    }

    public addActor(newActor: Actor) {
        this.actors.push(newActor);
    }

    public update() {
        this.removeDeadActors();
        this.actors.forEach((actor) => actor.update(this.bounds));
    }

    public paint() {
        this.actors.forEach((actor) => actor.paint(this.context));
    }

    private removeActor(actor: Actor) {
        this.actors = this.actors.filter((ac) => ac !== actor);
    }

    private removeDeadActors() {
        const self = this;
        this.actors
            .filter((actor) => actor.isAlive === false)
            .forEach((actor) => self.removeActor(actor));
    }
}

export function init(canvasSelector: string): Stage {
    setDesiredFps(60);
    initBasicStage(canvasSelector);
    return mainStage;
}

export function start() {
    window.requestAnimationFrame(loop);
}

function setDesiredFps(fps: number) {
    desiredFps = fps;
    fpsInterval = 1000 / desiredFps;
}

function initBasicStage(canvasSelector: string) {
    const stage = new BasicStage();
    stage.initForCanvas(canvasSelector);
    mainStage = stage;
}

function setFrameStartTime(now: number) {
    startTime = now;
}

function getFrameDuration(): number {
    const now = Date.now();
    return now - startTime;
}

function getFpsInterval(): number {
    return fpsInterval;
}

function loop() {
    window.requestAnimationFrame(loop);

    if (getFrameDuration() > getFpsInterval()) {
        setFrameStartTime(Date.now() - (getFrameDuration() % getFpsInterval()));

        const stage = mainStage as BasicStage;
        stage.clear();
        stage.update();
        stage.paint();
    }
}