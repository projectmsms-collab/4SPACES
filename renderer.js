class MazeRenderer {
    constructor(canvas, maze) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.maze = maze;
        this.cellSize = 50;
    }

    draw() {
        const ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.maze.size; y++) {
            for (let x = 0; x < this.maze.size; x++) {
                ctx.strokeStyle = '#555';
                ctx.strokeRect(
                    x * this.cellSize,
                    y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }

        ctx.fillStyle = 'green';
        ctx.fillRect(
            this.maze.exitPos.x * this.cellSize,
            this.maze.exitPos.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(
}
