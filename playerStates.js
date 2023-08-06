import { Dust } from './particles.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING : 4,
    DIVING: 5,
    HIT: 6,
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game) {
        super('SITTING', game);
    }
    enter() {
    this.game.frameX = 0;
    this.game.maxFrame = 4;
    this.game.frameY = 5;
    }
    handle(input) {
       if(input.includes('ArrowLeft') || input.includes('ArrowRight')) {
        this.game.setState(states.RUNNING, 1);
       } else if (input.includes('Space')) {
        this.game.setState(states.ROLLING, 2);
       }
    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }
    enter() {
    this.game.frameX = 0;
    this.game.maxFrame = 6;
    this.game.frameY = 3;
    }
    handle(input) {
       if(input.includes('ArrowDown')) {
        this.game.setState(states.SITTING, 0);
       } else if (input.includes('ArrowUp')) {
        this.game.setState(states.JUMPING, 1);
       } else if (input.includes('Space')) {
        this.game.setState(states.ROLLING, 2);
        
       }
    } 
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }
    enter() {
    if (this.game.onGround()) this.game.vy = -30;
    this.game.frameX = 0;
    this.game.maxFrame = 6;
    this.game.frameY = 1;
    }
    handle(input) {
       if(this.game.vy > this.game.weight) {
        this.game.setState(states.FALLING, 1);
       } else if (input.includes('Space')) {
        this.game.setState(states.ROLLING, 2);
        
       }
    } 
}

export class Falling extends State {
    constructor(game) {
        super('FALLING', game);
    }
    enter() {
    this.game.frameX = 0;
    this.game.maxFrame = 6;
    this.game.frameY = 2;
    
    }
    handle(input) {
       if(this.game.onGround()) {
        this.game.setState(states.RUNNING, 1);
       } else if (!input.includes('Space') && !this.game.onGround()) {
        this.game.setState(states.ROLLING, 2);
       }
    } 
}

export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game);
    }
    enter() {
    this.game.frameX = 0;
    this.game.maxFrame = 6;
    this.game.frameY = 6;
    
    }
    handle(input) {
       if(!input.includes('Space') && this.game.onGround()) {
        this.game.setState(states.RUNNING, 1);
       } else if (!input.includes('Space') && !this.game.onGround()) {
        this.game.setState(states.FALLING, 1);
       } else if (input.includes('Space') && input.includes('ArrowUp') && this.game.onGround()) {
        this.game.vy -= 27;
       }
    }
}