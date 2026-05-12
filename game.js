/* =====================================
   LABYRINTH QUEST - MAIN GAME CONTROLLER
   ===================================== */

class LabyrinthGame {
    constructor() {
        // Core game elements
        this.maze = new Maze();
        this.taskManager = new TaskManager();
        this.renderer = new MazeRenderer(
            document.getElementById('maze-canvas'),
            this.maze
        );

        // Game state
        this.currentLevel = 1;
        this.totalXP = 0;
        this.currentXP = 0;
        this.inMazePhase = true;
        this.gameComplete = false;

        // DOM elements
        this.canvas = document.getElementById('maze-canvas');
        this.taskInput = document.getElementById('task-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.feedbackArea = document.getElementById('feedback-area');
        this.hintsDisplay = document.getElementById('hints-display');
        this.levelDisplay = document.getElementById('level-display');
        this.xpDisplay = document.getElementById('xp-display');
        this.tasksDisplay = document.getElementById('tasks-display');
        this.positionDisplay = document.getElementById('position-display');

        // Modals
        this.achievementModal = document.getElementById('achievement-modal');
        this.gameoverModal = document.getElementById('gameover-modal');

        // Initialize event listeners
        this.setupEventListeners();

        // Draw initial maze
        this.renderer.draw();
        this.updateUI();
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Button controls
        document.getElementById('btn-up').addEventListener('click', () => this.movePlayer('up'));
        document.getElementById('btn-down').addEventListener('click', () => this.movePlayer('down'));
        document.getElementById('btn-left').addEventListener('click', () => this.movePlayer('left'));
        document.getElementById('btn-right').addEventListener('click', () => this.movePlayer('right'));

        // Task controls
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });

        // Modal controls
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        document.getElementById('continue-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }

    handleKeyPress(e) {
        if (!this.inMazePhase) return;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.movePlayer('up');
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.movePlayer('down');
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.movePlayer('left');
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.movePlayer('right');
                break;
        }
    }

    movePlayer(direction) {
        if (!this.inMazePhase) return;

        this.maze.movePlayer(direction);
        this.renderer.draw();
        this.updateUI();

        // Check if player reached exit
        if (this.maze.isAtExit()) {
            this.reachedExit();
        }
    }

    reachedExit() {
        this.inMazePhase = false;
        this.showFeedback(
            `🎉 Maze completed! Now solve the task to progress!`,
            'info'
        );
        this.taskInput.focus();
    }

    submitAnswer() {
        if (this.inMazePhase) return;

        const userAnswer = this.taskInput.value.trim();

        if (!userAnswer) {
            this.showFeedback('❌ Please enter an answer!', 'error');
            return;
        }

        const isCorrect = this.taskManager.checkAnswer(userAnswer);

        if (isCorrect) {
            const task = this.taskManager.getCurrentTask();
            this.gainXP(task.xpReward);
            this.taskManager.addCompletedTask(task.id);

            this.showFeedback(
                `✅ Correct! You earned ${task.xpReward} XP!`,
                'success'
            );

            this.taskInput.value = '';
            this.hintsDisplay.classList.remove('show');

            // Proceed to next task or level
            setTimeout(() => this.proceedToNext(), 1500);
        } else {
            this.showFeedback(
                `❌ Not quite right. Try again!`,
                'error'
            );
            this.taskInput.value = '';
        }
    }

    proceedToNext() {
        if (this.taskManager.nextTask()) {
            // More tasks in this level
            this.displayTask();
            this.resetMaze();
        } else {
            // Level complete!
            if (this.currentLevel < 5) {
                this.showAchievementModal();
            } else {
                this.showGameOverModal();
            }
        }
    }

    gainXP(amount) {
        this.currentXP += amount;
        this.totalXP += amount;

        // Check if leveled up
        if (this.currentXP >= 100) {
            this.levelUp();
        }

        this.updateUI();
    }

    levelUp() {
        const extraXP = this.currentXP - 100;
        this.currentXP = extraXP;
    }

    displayTask() {
        const task = this.taskManager.getCurrentTask();
        if (!task) return;

        document.getElementById('task-title').textContent = `📝 ${task.title}`;
        document.getElementById('task-description').textContent = task.description;
        document.getElementById('difficulty-badge').textContent = `Level ${this.currentLevel} - ${task.difficulty}`;

        this.taskInput.value = '';
        this.taskInput.placeholder = 'Type your answer here...';
        this.hintsDisplay.classList.remove('show');
        this.feedbackArea.classList.remove('success', 'error', 'info');
        this.feedbackArea.textContent = '';
        this.feedbackArea.style.display = 'none';

        this.inMazePhase = true;
        this.resetMaze();
    }

    resetMaze() {
        this.maze = new Maze();
        this.renderer.maze = this.maze;
        this.renderer.draw();
        this.updateUI();
    }

    showHint() {
        const task = this.taskManager.getCurrentTask();
        if (!task) return;

        let hintsHTML = '<h4>💡 Hints:</h4>';
        task.hints.forEach((hint, index) => {
            hintsHTML += `<div class="hint-item">${index + 1}. ${hint}</div>`;
        });

        this.hintsDisplay.innerHTML = hintsHTML;
        this.hintsDisplay.classList.add('show');
    }

    showFeedback(message, type) {
        this.feedbackArea.textContent = message;
        this.feedbackArea.className = `feedback-area ${type}`;
        this.feedbackArea.style.display = 'flex';
    }

    updateUI() {
        this.levelDisplay.textContent = this.currentLevel;
        this.xpDisplay.textContent = `${this.currentXP}/100`;
        this.tasksDisplay.textContent = this.taskManager.getTasksCompletedCount();
        this.positionDisplay.textContent = `${this.maze.playerPos.x},${this.maze.playerPos.y}`;
    }

    showAchievementModal() {
        const modal = this.achievementModal;
        document.getElementById('achievement-title').textContent = `🎉 Level ${this.currentLevel} Complete!`;
        document.getElementById('achievement-message').textContent =
            `Great job completing Level ${this.currentLevel}! You've grown stronger in your coding journey. Ready for the next challenge?`;

        modal.classList.add('show');
    }

    showGameOverModal() {
        const modal = this.gameoverModal;
        const totalTasks = this.taskManager.getTasksCompletedCount();

        document.getElementById('gameover-message').textContent =
            `🏆 Congratulations! You've conquered all 5 levels of Labyrinth Quest!`;

        document.getElementById('gameover-stats').innerHTML = `
            <strong>Final Stats:</strong><br>
            Total Tasks Completed: ${totalTasks}<br>
            Total XP Earned: ${this.totalXP}<br>
            🌟 Achievement Unlocked: Labyrinth Master!
        `;

        modal.classList.add('show');
    }

    nextLevel() {
        this.closeModal();

        if (this.taskManager.nextLevel()) {
            this.currentLevel++;
            this.displayTask();
            this.updateUI();
        }
    }

    closeModal() {
        this.achievementModal.classList.remove('show');
        this.gameoverModal.classList.remove('show');
    }

    restart() {
        this.closeModal();
        this.currentLevel = 1;
        this.totalXP = 0;
        this.currentXP = 0;
        this.taskManager.reset();
        this.displayTask();
        this.updateUI();
    }
}

/* =====================================
   GAME INITIALIZATION
   ===================================== */

let game;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize game
    game = new LabyrinthGame();

    // Show first task
    game.displayTask();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (game && game.renderer) {
            game.renderer.resize();
            game.renderer.draw();
        }
    });
});
