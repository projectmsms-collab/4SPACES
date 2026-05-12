class Renderer {
    constructor(canvasId, maze) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.maze = maze;
        this.cellSize = this.canvas.width / maze.width;
    }

    clear() {
        this.ctx.fillStyle = '#222';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMaze() {
        const { grid, width, height } = this.maze;
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (grid[y][x] === 1) {
                    // Wall
                    this.ctx.fillStyle = '#444';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                } else {
                    // Path
                    this.ctx.fillStyle = '#1a1a1a';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }

    drawGoal(goalX, goalY) {
        // Green goal square
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillRect(
            goalX * this.cellSize + 2,
            goalY * this.cellSize + 2,
            this.cellSize - 4,
            this.cellSize - 4
        );
    }

    drawPlayer(playerX, playerY) {
        // Blue player circle
        this.ctx.fillStyle = '#00bfff';
        this.ctx.beginPath();
        this.ctx.arc(
            playerX * this.cellSize + this.cellSize / 2,
            playerY * this.cellSize + this.cellSize / 2,
            this.cellSize / 3,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    render(playerX, playerY, goalX, goalY) {
        this.clear();
        this.drawMaze();
        this.drawGoal(goalX, goalY);
        this.drawPlayer(playerX, playerY);
    }
}
