import * as Game from './game';
import { Point, Size } from './foundation';
import { Rectangle } from './shapes';



function clearStage() {
    const stage = Game.getCanvas();
    stage.context.clearRect(0, 0, stage.size.width, stage.size.height);
    stage.context.fillStyle = 'rgb(0,0,0)';
    stage.context.fillRect(0, 0, stage.size.width, stage.size.height);
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
    const stage = Game.getCanvas();

    const canvasCenter: Point = {
        x: stage.size.width / 2,
        y: stage.size.height / 2
    };
    const recSize: Size = {
        width: 100, height: 100
    };
    const rect = new Rectangle(stage, canvasCenter, recSize);
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