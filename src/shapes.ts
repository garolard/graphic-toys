import { Actor } from './game';
import { Point, Size } from './foundation';

export class Rectangle implements Actor {

    private rectCenter: Point;
    private rectSize: Size;
    private horizontalDirection: number;
    private verticalDirection: number;

    constructor(center: Point, size: Size) {
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

    public update(stageBounds: Size) {
        if (this.isMovingToLeft()) {
            if (!this.reachLeftLimit(stageBounds)) {
                this.rectCenter.x -= 5;
            } else {
                this.horizontalDirection = 1;
            }
        } else {
            if (!this.reachRightLimit(stageBounds)) {
                this.rectCenter.x += 5;
            } else {
                this.horizontalDirection = 0;
            }
        }

        if (this.isMovingToTop()) {
            if (!this.reachTopLimit(stageBounds)) {
                this.rectCenter.y -= 5;
            } else {
                this.verticalDirection = 1;
            }
        } else {
            if (!this.reachBottomLimit(stageBounds)) {
                this.rectCenter.y += 5;
            } else {
                this.verticalDirection = 0;
            }
        }
    }

    public paint(context: CanvasRenderingContext2D) {
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(
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

    private reachLeftLimit(bounds: Size): boolean {
        return this.rectCenter.x - this.rectSize.width / 2 <= 0;
    }

    private reachRightLimit(bounds: Size): boolean {
        return this.rectCenter.x + this.rectSize.width / 2 >= bounds.width;
    }

    private reachTopLimit(bounds: Size): boolean {
        return this.rectCenter.y - this.rectSize.height / 2 <= 0;
    }

    private reachBottomLimit(bounds: Size): boolean {
        return this.rectCenter.y + this.rectSize.height / 2 >= bounds.height;
    }
}