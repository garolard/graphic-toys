import * as Game from './game';
import { BasicStage } from './game';
import { Point, Size } from './foundation';
import { Rectangle } from './shapes';

class CustomSpeedRectangle extends Rectangle {
    private speed: number;

    constructor(center: Point, size: Size, speed: number) {
        super(center, size);
        this.speed = speed;
    }

    public update(stageBounds: Size) {
        if (this.isMovingToLeft()) {
            if (!this.reachLeftLimit(stageBounds)) {
                this.rectCenter.x -= this.speed;
            } else {
                this.horizontalDirection = 1;
            }
        } else {
            if (!this.reachRightLimit(stageBounds)) {
                this.rectCenter.x += this.speed;
            } else {
                this.horizontalDirection = 0;
            }
        }

        if (this.isMovingToTop()) {
            if (!this.reachTopLimit(stageBounds)) {
                this.rectCenter.y -= this.speed;
            } else {
                this.verticalDirection = 1;
            }
        } else {
            if (!this.reachBottomLimit(stageBounds)) {
                this.rectCenter.y += this.speed;
            } else {
                this.verticalDirection = 0;
            }
        }
    }
}

class ShyRectangle extends Rectangle {
    public update(stageBounds: Size) {
        if (this.isMovingToLeft()) {
            if (!this.reachLeftLimit(stageBounds)) {
                this.rectCenter.x -= 5;
            } else {
                this.isAlive = false;
            }
        } else {
            if (!this.reachRightLimit(stageBounds)) {
                this.rectCenter.x += 5;
            } else {
                this.isAlive = false;
            }
        }

        if (this.isMovingToTop()) {
            if (!this.reachTopLimit(stageBounds)) {
                this.rectCenter.y -= 5;
            } else {
                this.isAlive = false;
            }
        } else {
            if (!this.reachBottomLimit(stageBounds)) {
                this.rectCenter.y += 5;
            } else {
                this.isAlive = false;
            }
        }
    }
}

function start() {
    const stage = Game.init('main-canvas') as BasicStage;

    stage.clear();
    stage.addActor(getBasicRectangle());

    const rect = getRandomRectangle();
    stage.addActor(rect);

    const rect2 = getShyRectangle();
    stage.addActor(rect2);

    Game.start();
}

function getShyRectangle(): ShyRectangle {
    const canvasCenter: Point = {
        x: 800 / 2,
        y: 600 / 2
    };
    const recSize: Size = {
        width: 20, height: 20
    };
    return new ShyRectangle(canvasCenter, recSize);
}

function getRandomRectangle(): CustomSpeedRectangle {
    const canvasCenter: Point = {
        x: 800 / 2,
        y: 600 / 2
    };
    const recSize: Size = {
        width: 40, height: 40
    };
    const speed = Math.floor(Math.random() * 10);
    return new CustomSpeedRectangle(canvasCenter, recSize, speed);
}

function getBasicRectangle(): Rectangle {
    // El stage debería exponer su tamaño??
    const canvasCenter: Point = {
        x: 800 / 2,
        y: 600 / 2
    };
    const recSize: Size = {
        width: 100, height: 100
    };
    const rect = new Rectangle(canvasCenter, recSize);
    return rect;
}

start();