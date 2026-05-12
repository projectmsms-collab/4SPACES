class TaskManager {
    constructor() {
        this.tasksCompleted = 0;
        this.currentTaskIndex = 0;
        this.currentHintIndex = 0;

        this.tasks = [
            {
                id: 1,
                title: '🧮 Math Puzzle',
                description: 'What is 15 × 8?',
                answer: '120',
                difficulty: 'Easy',
                hints: ['Multiply 15 by 8', 'Think: 15 × 8 = 15 × (10 - 2)']
            },
            {
                id: 2,
                title: '🎯 Logic Puzzle',
                description: 'I have cities but no houses, forests but no trees, and water but no fish. What am I?',
                answer: 'map',
                difficulty: 'Medium',
                hints: ['It\'s something you look at', 'You use it for navigation']
            },
            {
                id: 3,
                title: '🧩 Word Challenge',
                description: 'What is a 5-letter word that becomes shorter when you add 2 letters to it?',
                answer: 'short',
                difficulty: 'Hard',
                hints: ['Think about the word "short"', 'short + two letters = shorter (in meaning)']
            },
            {
                id: 4,
                title: '🤔 Riddle',
                description: 'What has hands but cannot clap?',
                answer: 'clock',
                difficulty: 'Easy',
                hints: ['It tells time', 'It has hour and minute hands']
            },
            {
                id: 5,
                title: '🧠 Trivia',
                description: 'What is the smallest prime number?',
                answer: '2',
                difficulty: 'Easy',
                hints: ['It\'s even', 'It\'s the only even prime number']
            }
        ];
    }

    getCurrentTask() {
        return this.tasks[this.currentTaskIndex];
    }

    checkAnswer(userAnswer) {
        const correctAnswer = this.tasks[this.currentTaskIndex].answer.toLowerCase();
        return userAnswer.toLowerCase().trim() === correctAnswer;
    }

    getHint() {
        const task = this.getCurrentTask();
        if (this.currentHintIndex < task.hints.length) {
            return task.hints[this.currentHintIndex++];
        }
        return 'No more hints available!';
    }

    completeTask() {
        this.tasksCompleted++;
        this.currentTaskIndex++;
        this.currentHintIndex = 0;
    }

    isGameComplete() {
        return this.tasksCompleted >= this.tasks.length;
    }

    getTotalTasks() {
        return this.tasks.length;
    }
}
