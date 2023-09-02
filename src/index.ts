import Game from './objets/Game';

const CANVAS_ID = 'game';

const game = new Game(CANVAS_ID);

await game.init();
