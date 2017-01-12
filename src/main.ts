import * as Game from './game';

class Point {
    public x: number;
    public y: number;
}

class Size {
    public width: number;
    public height: number;
}

class Rectangle implements Game.IGameObject {

    private center: Point;
    private size: Size;
    private direction: number;

    constructor(center: Point, size: Size) {
        this.center = center;
        this.size = size;
        this.direction = 0;
    }

    public update() {
        if (this.direction === 0) {
            if (this.center.x - this.size.width / 2 > 0) {
                this.center.x -= 5;
            } else {
                this.direction = 1;
            }
        } else {
            if (this.center.x + this.size.height / 2 < Game.getCanvas().width) {
                this.center.x += 5;
            } else {
                this.direction = 0;
            }
        }
    }

    public paint() {
        Game.getContext().fillStyle = 'rgb(255, 255, 255)';
        Game.getContext().fillRect(
            this.center.x - this.size.width / 2,
            this.center.y - this.size.height / 2,
            this.size.width,
            this.size.height);
    }
}

function clearStage() {
    Game.getContext().clearRect(0, 0, Game.getCanvas().width, Game.getCanvas().height);
    Game.getContext().fillStyle = 'rgb(0,0,0)';
    Game.getContext().fillRect(0, 0, Game.getCanvas().width, Game.getCanvas().height);
}

function start() {
    Game.init();
    Game.setDesiredFps(50);
    Game.setFrameStartTime(Date.now());

    clearStage();
    Game.addGameObject(getBasicRectangle());

    loop();
}

function getBasicRectangle(): Rectangle {
    const canvasCenter: Point = {
        x: Game.getCanvas().width / 2,
        y: Game.getCanvas().height / 2
    };
    const recSize: Size = {
        width: 100, height: 100
    };
    const rect = new Rectangle(canvasCenter, recSize);
    return rect;
}

function loop() {
    window.requestAnimationFrame(loop);

    if (Game.getFrameDuration() > Game.getFpsInterval()) {
        Game.setFrameStartTime(Date.now() - (Game.getFrameDuration() % Game.getFpsInterval()));

        draw();
    }
}

function draw() {
    clearStage();

    for (const entity of Game.entities()) {
        entity.update();
    }

    for (const entity of Game.entities()) {
        entity.paint();
    }
}

window.requestAnimationFrame(start);