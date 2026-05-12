class Maze {
    constructor() {
        this.size = 10;
        this.playerPos = { x: 0, y: 0 };
        this.exitPos = { x: 9, y: 9 };
    }

    movePlayer(direction) {
        switch(direction) {
            case 'up':
                if (this.playerPos.y > 0) this.playerPos.y--;
                break;
            case 'down':
                if (this.playerPos.y < this.size - 1) this.playerPos.y++;
                break;
            case 'left':
                if (this.playerPos.x > 0) this.playerPos.x--;
                break;
            case 'right':
                if (this.playerPos.x < this.size - 1) this.playerPos.x++;
                break;
        }
    }

    isAtExit() {
        return (
            this.playerPos.x === this.exitPos.x &&
            this.playerPos.y === this.exitPos.y
        );
    }
}
