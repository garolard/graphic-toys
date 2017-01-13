import * as Game from './game'; // Llamadas a Game acoplan las clases al contexto propio de HTML
import { GameObject } from './game';
import { Point, Size } from './foundation';

export class Rectangle implements GameObject {

    private stage: Game.GameStage;
    private rectCenter: Point;
    private rectSize: Size;
    private horizontalDirection: number;
    private verticalDirection: number;

    constructor(stage: Game.GameStage, center: Point, size: Size) {
        this.stage = stage;
        this.rectCenter = center;
        this.rectSize = size;
        this.horizontalDirection = 0;
        this.verticalDirection = 0;
    }

    get center(): Point {
        return this.rectCenter;
    }

    get size(): Size {
        return this.rectSize;
    }

    public update() {
        if (this.isMovingToLeft()) {
            if (!this.reachLeftLimit()) {
                this.rectCenter.x -= 5;
            } else {
                this.horizontalDirection = 1;
            }
        } else {
            if (!this.reachRightLimit()) {
                this.rectCenter.x += 5;
            } else {
                this.horizontalDirection = 0;
            }
        }

        if (this.isMovingToTop()) {
            if (!this.reachTopLimit()) {
                this.rectCenter.y -= 5;
            } else {
                this.verticalDirection = 1;
            }
        } else {
            if (!this.reachBottomLimit()) {
                this.rectCenter.y += 5;
            } else {
                this.verticalDirection = 0;
            }
        }
    }

    public paint() {
        this.stage.context.fillStyle = 'rgb(255, 255, 255)';
        this.stage.context.fillRect(
            this.rectCenter.x - this.rectSize.width / 2,
            this.rectCenter.y - this.rectSize.height / 2,
            this.rectSize.width,
            this.rectSize.height);
    }

    private isMovingToLeft(): boolean {
        return this.horizontalDirection === 0;
    }

    // private isMovingToRight(): boolean {
    //     return this.horizontalDirection === 1;
    // }

    private isMovingToTop(): boolean {
        return this.verticalDirection === 0;
    }

    // private isMovingToBottom(): boolean {
    //     return this.verticalDirection === 1;
    // }

    private reachLeftLimit(): boolean {
        return this.rectCenter.x - this.rectSize.width / 2 <= 0;
    }

    private reachRightLimit(): boolean {
        return this.rectCenter.x + this.rectSize.width / 2 >= this.stage.size.width;
    }

    private reachTopLimit(): boolean {
        return this.rectCenter.y - this.rectSize.height / 2 <= 0;
    }

    private reachBottomLimit(): boolean {
        return this.rectCenter.y + this.rectSize.height / 2 >= this.stage.size.height;
    }
}