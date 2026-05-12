// Game state
let maze;
let renderer;
let taskManager;
let gameState = {
    level: 1,
    xp: 0,
    xpNeeded: 100,
    taskAttempts: 0,
    inTask: false,
    gameComplete: false
};

// Initialize game
function initGame() {
    maze = new Maze();
    renderer = new Renderer('maze-canvas', maze);
    taskManager = new TaskManager();
    gameState = {
        level: 1,
        xp: 0,
        xpNeeded: 100,
        taskAttempts: 0,
        inTask: false,
        gameComplete: false
    };
    
    setupEventListeners();
    updateUI();
    render();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('btn-up').addEventListener('click', () => movePlayer('up'));
    document.getElementById('btn-down').addEventListener('click', () => movePlayer('down'));
    document.getElementById('btn-left').addEventListener('click', () => movePlayer('left'));
    document.getElementById('btn-right').addEventListener('click', () => movePlayer('right'));
    
    document.getElementById('submit-btn').addEventListener('click', submitTask);
    document.getElementById('hint-btn').addEventListener('click', showHint);
    
    document.getElementById('continue-btn').addEventListener('click', nextLevel);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    document.querySelector('.close').addEventListener('click', closeModal);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            const directionMap = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right'
            };
            movePlayer(directionMap[e.key]);
        }
    });
}

// Player movement
function movePlayer(direction) {
    if (gameState.inTask) return;
    
    maze.movePlayer(direction);
    render();
    checkGoal();
}

// Check if player reached goal
function checkGoal() {
    if (maze.isAtExit()) {
        startTask();
    }
}

// Start task
function startTask() {
    gameState.inTask = true;
    const task = taskManager.getCurrentTask();
    
    document.getElementById('task-title').textContent = task.title;
    document.getElementById('task-description').textContent = task.description;
    document.getElementById('difficulty-badge').textContent = `Difficulty: ${task.difficulty}`;
    document.getElementById('task-input').value = '';
    document.getElementById('feedback-area').textContent = '';
    document.getElementById('hints-display').textContent = '';
    document.getElementById('task-input').focus();
}

// Submit task answer
function submitTask() {
    const userAnswer = document.getElementById('task-input').value;
    const feedback = document.getElementById('feedback-area');
    
    if (!userAnswer.trim()) {
        feedback.textContent = 'Please enter an answer!';
        feedback.className = 'feedback-area error';
        return;
    }
    
    if (taskManager.checkAnswer(userAnswer)) {
        feedback.textContent = '✓ Correct! Well done!';
        feedback.className = 'feedback-area success';
        
        // Award XP
        const xpGain = 20;
        gameState.xp += xpGain;
        
        if (gameState.xp >= gameState.xpNeeded) {
            gameState.xp -= gameState.xpNeeded;
            gameState.level++;
        }
        
        taskManager.completeTask();
        
        if (taskManager.isGameComplete()) {
            gameState.gameComplete = true;
            showGameComplete();
        } else {
            setTimeout(showAchievement, 1500);
        }
    } else {
        feedback.textContent = '✗ Incorrect. Try again!';
        feedback.className = 'feedback-area error';
        gameState.taskAttempts++;
    }
    
    updateUI();
}

// Show hint
function showHint() {
    if (gameState.inTask) {
        const hint = taskManager.getHint();
        const hintsDisplay = document.getElementById('hints-display');
        hintsDisplay.textContent = `💡 Hint: ${hint}`;
    }
}

// Show achievement modal
function showAchievement() {
    const currentTask = taskManager.tasks[taskManager.currentTaskIndex - 1];
    document.getElementById('achievement-title').textContent = '🎉 Task Complete!';
    document.getElementById('achievement-message').textContent = `You completed: ${currentTask.title}`;
    document.getElementById('achievement-modal').classList.add('show');
}

// Show game complete modal
function showGameComplete() {
    const stats = `
        <p><strong>Levels:</strong> ${gameState.level}</p>
        <p><strong>Total XP:</strong> ${gameState.xp}</p>
        <p><strong>Tasks Completed:</strong> ${taskManager.tasksCompleted}/${taskManager.getTotalTasks()}</p>
        <p><strong>Attempts:</strong> ${gameState.taskAttempts}</p>
    `;
    
    document.getElementById('gameover-message').textContent = 'Congratulations! You completed the Labyrinth Quest!';
    document.getElementById('gameover-stats').innerHTML = stats;
    document.getElementById('gameover-modal').classList.add('show');
}

// Next level
function nextLevel() {
    closeModal();
    gameState.inTask = false;
    
    // Reset maze position and goal
    maze = new Maze();
    renderer = new Renderer('maze-canvas', maze);
    
    updateUI();
    render();
}

// Restart game
function restartGame() {
    closeModal();
    initGame();
}

// Close modal
function closeModal() {
    document.getElementById('achievement-modal').classList.remove('show');
    document.getElementById('gameover-modal').classList.remove('show');
}

// Update UI
function updateUI() {
    document.getElementById('level-display').textContent = gameState.level;
    document.getElementById('xp-display').textContent = `${gameState.xp}/${gameState.xpNeeded}`;
    document.getElementById('tasks-display').textContent = taskManager.tasksCompleted;
    document.getElementById('position-display').textContent = `${maze.playerPos.x},${maze.playerPos.y}`;
}

// Render game
function render() {
    renderer.render(maze.playerPos.x, maze.playerPos.y, maze.exitPos.x, maze.exitPos.y);
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', initGame);
