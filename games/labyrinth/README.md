## 🏰 Labyrinth Quest - Educational Coding Game

An interactive maze game designed for 5th grade students to learn coding concepts while playing an engaging puzzle game!

### 🎮 Game Overview

**Labyrinth Quest** combines maze navigation with coding education. Players navigate through randomly generated mazes and must solve coding-related tasks to level up. As they progress through 5 levels, both the maze complexity and task difficulty increase.

### 📚 Learning Objectives

Students will learn:
- **Level 1**: Basic arithmetic and mathematical operations
- **Level 2**: Conditional statements (if/else), loops, and array indexing
- **Level 3**: Functions and their outputs, nested structures
- **Level 4**: Recursion, string operations, data structures
- **Level 5**: Complex algorithms, advanced logic, pattern recognition

### 🎯 Game Mechanics

1. **Maze Navigation**
   - Navigate through randomly generated mazes using arrow keys or buttons
   - Find the golden exit door (🚪) to complete each maze section
   - Maze gets progressively larger and more complex with each level

2. **Coding Tasks**
   - Solve coding-related questions to level up
   - 3-5 tasks per level with varying difficulty
   - Type answers in the code input area
   - Hints available for every question

3. **Experience & Progression**
   - Earn XP for each correct answer
   - 100 XP needed to level up
   - Difficulty increases with each level
   - Track your progress in real-time

### 🎮 Controls

- **Arrow Keys** or **Arrow Buttons**: Move through maze (Up/Down/Left/Right)
- **Enter** or **Submit Button**: Submit task answer
- **Hints**: Click "💡 Need a hint?" to see helpful tips

### 📊 Level Progression

| Level | Difficulty | Maze Size | Tasks | Topic |
|-------|-----------|-----------|-------|-------|
| 1 | Easy | 15×15 | 3 | Basic Math |
| 2 | Medium | 15×15 | 3 | Logic & Loops |
| 3 | Hard | 15×15 | 3 | Functions |
| 4 | Hard | 15×15 | 3 | Recursion & Data |
| 5 | Expert | 15×15 | 3 | Complex Algorithms |

### 📁 File Structure

```
games/labyrinth/
├── index.html        # Main HTML interface
├── styles.css        # Game styling and layout
├── game.js          # Main game controller
├── maze.js          # Maze generation and player movement
├── tasks.js         # Task database and management
└── README.md        # This file
```

### 🔧 Technical Features

**Maze Generation**
- Recursive backtracking algorithm for procedural maze generation
- Each maze is unique and ensures a valid path from start to exit
- Cellular grid-based system for precise player movement

**Task System**
- 15 unique tasks across 5 levels
- Randomized task selection to prevent memorization
- Answer normalization for flexible user input
- Progressive difficulty scaling

**UI/UX**
- Responsive design for desktop and tablet
- Color-coded difficulty indicators
- Real-time feedback on task submission
- Modal popups for level achievements
- Smooth animations and transitions

### 🚀 How to Use

1. Open `index.html` in a web browser
2. Read the current task description
3. Navigate the maze using arrow keys or buttons
4. Find the exit (golden door)
5. Solve the coding task to continue
6. Progress through all 5 levels!

### 💡 Educational Features

- **Scaffolded Learning**: Tasks increase in difficulty progressively
- **Multiple Modalities**: Combines visual (maze), spatial (navigation), and cognitive (coding) learning
- **Immediate Feedback**: Students get instant feedback on correctness
- **Gamification**: Points, levels, and achievements encourage engagement
- **Hints System**: Support available without giving away answers

### 🎨 Customization

To add more tasks, edit the `TASK_DATABASE` in `tasks.js`:

```javascript
{
    id: 16,
    title: "Your Task Title",
    description: "Your task question here?",
    answer: "correct_answer",
    hints: ["Hint 1", "Hint 2"],
    xpReward: 30,
    difficulty: "Hard"
}
```

### 📱 Browser Compatibility

- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Works on desktop and tablets

### 🎓 Teacher Notes

- Estimated play time: 20-30 minutes per full playthrough
- Perfect for CS class introduction or after-school coding club
- Students can replay to improve their time and XP earning
- Consider having students work in pairs for collaborative learning
- Track student progress by checking their final level and tasks completed

### 🐛 Known Limitations

- Mobile touch controls not optimized (keyboard/buttons recommended)
- Answer checking is case-insensitive but requires exact spelling
- Maze size is fixed (can be modified in game.js)

### 🔄 Future Enhancements

- [ ] Leaderboard system
- [ ] Multiple player modes
- [ ] Custom difficulty settings
- [ ] More task categories (string manipulation, sorting, etc.)
- [ ] Sound effects and music
- [ ] Save/resume game functionality
- [ ] Teacher dashboard for monitoring student progress

### 📝 License

Educational use encouraged. Feel free to modify for classroom use.

---

**Made with ❤️ for 5th grade coders!** 🚀
