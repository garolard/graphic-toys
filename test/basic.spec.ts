import 'mocha';
import { expect } from 'chai';

import { Stage } from '../src/game';
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
        const fakeStage = createStage();
        const rect = getBaseRectangle();
        fakeStage.addActor(rect);
        
        fakeStage.update();
        fakeStage.update();

        expect(rect.center.x).to.equal(240);
        expect(rect.center.y).to.equal(240);
    });

    it('should change direction due to reach left stage limit', () => {
        const fakeStage = createStage();
        const rect = getRectAtLeftLimit();
        fakeStage.addActor(rect);

        fakeStage.update();
        fakeStage.update();

        expect(rect.center.x).to.equal(5);
    });
});

class FakeStage implements Stage {
    private bounds: Size;
    private actors: Rectangle[];

    public init() {
        this.bounds = {
            width: 500,
            height: 500
        };
        this.actors = [];
    }

    public addActor(actor: Rectangle) {
        this.actors.push(actor);
    }

    public update() {
        this.actors.forEach((actor) => actor.update(this.bounds));
    }

    public paint() {
        return;
    }
}

function createStage(): FakeStage {
    const stage = new FakeStage();
    stage.init();

    return stage;
}

function getBaseRectangle(): Rectangle {
    const center: Point = {x: 250, y: 250};
    const size: Size = {width: 10, height: 10};
    return new Rectangle(center, size);
}

function getRectAtLeftLimit(): Rectangle {
    const center: Point = {x: 0, y: 250};
    const size: Size = {width: 10, height: 10};
    return new Rectangle(center, size);
}