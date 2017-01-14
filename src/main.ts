import * as Game from './game';
import { BasicStage } from './game';
import { Point, Size } from './foundation';
import { Rectangle } from './shapes';

let stage: BasicStage;

function start() {
    stage = Game.getBasicStage('main-canvas');
    Game.setDesiredFps(60);
    Game.setFrameStartTime(Date.now());

    stage.clear();
    // stage.context.fillStyle = 'rgb(0,0,0)';
    // stage.context.fillRect(0, 0, stage.bounds.width, stage.bounds.height);
    stage.addActor(getBasicRectangle());

    const rect = new Rectangle({x: 40, y: 40}, {width: 20, height: 20});
    stage.addActor(rect);

    const rect2 = new Rectangle({x: 400, y: 53}, {width: 45, height: 45});
    stage.addActor(rect2);

    loop();
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

function loop() {
    window.requestAnimationFrame(loop);

    if (Game.getFrameDuration() > Game.getFpsInterval()) {
        Game.setFrameStartTime(Date.now() - (Game.getFrameDuration() % Game.getFpsInterval()));

        const basicStage = stage as BasicStage;
        basicStage.clear();
        basicStage.update();
        basicStage.paint();
    }
}

window.requestAnimationFrame(start);