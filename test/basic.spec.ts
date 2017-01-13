import 'mocha';
import { expect } from 'chai';

import { GameStage } from '../src/game';
import { Point, Size } from '../src/foundation';
import { Rectangle } from '../src/shapes';

describe('rectangle', () => {
    it('should have center in (250,250) and a size of (10, 10)', () => {
        const rect = getBaseRectangle();

        expect(rect.center.x).to.equal(250);
        expect(rect.center.y).to.equal(250);
        expect(rect.size.width).to.equal(10);
        expect(rect.size.height).to.equal(10);
    });

    it('should move 10 pixels to left and 10 pixels to up (center in (240, 240))', () => {
        const rect = getBaseRectangle();
        rect.update();
        rect.update();

        expect(rect.center.x).to.equal(240);
        expect(rect.center.y).to.equal(240);
    });

    it('should change direction due to reach left stage limit', () => {
        const rect = getRectAtLeftLimit();

        rect.update();
        rect.update();

        expect(rect.center.x).to.equal(5);
    });
});

function getBaseRectangle(): Rectangle {
    const center: Point = {x: 250, y: 250};
    const size: Size = {width: 10, height: 10};
    const stage: GameStage = {
        size: {
            width: 500,
            height: 500
        },
        canvas: null,
        context: null
    };
    return new Rectangle(stage, center, size);
}

function getRectAtLeftLimit(): Rectangle {
    const center: Point = {x: 0, y: 250};
    const size: Size = {width: 10, height: 10};
    const stage: GameStage = {
        size: {
            width: 500,
            height: 500
        },
        canvas: null,
        context: null
    };
    return new Rectangle(stage, center, size);
}