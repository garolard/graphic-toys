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
    private horizontalDirection: number;
    private verticalDirection: number;

    constructor(center: Point, size: Size) {
        this.center = center;
        this.size = size;
        this.horizontalDirection = 0;
        this.verticalDirection = 0;
    }

    public update() {
        if (this.isMovingToLeft()) {
            if (!this.reachLeftLimit()) {
                this.center.x -= 5;
            } else {
                this.horizontalDirection = 1;
            }
        } else {
            if (!this.reachRightLimit()) {
                this.center.x += 5;
            } else {
                this.horizontalDirection = 0;
            }
        }

        if (this.isMovingToTop()) {
            if (!this.reachTopLimit()) {
                this.center.y -= 5;
            } else {
                this.verticalDirection = 1;
            }
        } else {
            if (!this.reachBottomLimit()) {
                this.center.y += 5;
            } else {
                this.verticalDirection = 0;
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

    private isMovingToLeft(): boolean {
        return this.horizontalDirection === 0;
    }

    private isMovingToRight(): boolean {
        return this.horizontalDirection === 1;
    }

    private isMovingToTop(): boolean {
        return this.verticalDirection === 0;
    }

    private isMovingToBottom(): boolean {
        return this.verticalDirection === 1;
    }

    private reachLeftLimit(): boolean {
        return this.center.x - this.size.width / 2 <= 0;
    }

    private reachRightLimit(): boolean {
        return this.center.x + this.size.width / 2 >= Game.getCanvas().width;
    }

    private reachTopLimit(): boolean {
        return this.center.y - this.size.height / 2 <= 0;
    }

    private reachBottomLimit(): boolean {
        return this.center.y + this.size.height / 2 >= Game.getCanvas().height;
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