class TaskManager {
    constructor() {
        this.level = 1;
        this.completedTasks = [];
        this.currentTaskIndex = 0;

        this.tasks = [
            {
                id: 1,
                title: 'Math Puzzle',
                description: 'What is 5 + 7?',
                answer: '12',
                xpReward: 20,
                difficulty: 'Easy',
                hints: ['Add the numbers together']
            },
            {
                id: 2,
                title: 'Coding Question',
                description: 'What keyword creates a variable in JavaScript?',
                answer: 'let',
                xpReward: 30,
                difficulty: 'Medium',
                hints: ['Starts with L']
            },
            {
                id: 3,
                title: 'Logic Task',
                description: 'What comes after B?',
                answer: 'C',
                xpReward: 20,
                difficulty: 'Easy',
                hints: ['Alphabet order']
            }
        ];
    }
}
