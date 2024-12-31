class SlotMachine {
    constructor() {
        this.fruits = ['🍎', '🍐', '🍊', '🍇', '🍉'];
        this.numbers = ['1', '2', '3', '4', '5'];
        this.isSpinning = false;
        
        this.fruitReels = document.querySelectorAll('#fruits .reel');
        this.numberReels = document.querySelectorAll('#numbers .reel');
        
        this.startButton = document.getElementById('startButton');
        this.resetButton = document.getElementById('resetButton');
        this.resultDisplay = document.getElementById('result');
        
        this.setupEventListeners();
        this.reset();
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.resetButton.addEventListener('click', () => this.reset());
    }

    reset() {
        this.isSpinning = false;
        this.startButton.disabled = false;
        this.randomizeReels(this.fruitReels, this.fruits);
        this.randomizeReels(this.numberReels, this.numbers);
        this.resultDisplay.textContent = '';
    }

    randomizeReels(reels, symbols) {
        reels.forEach(reel => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
        });
    }

    async start() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.startButton.disabled = true;
        this.resultDisplay.textContent = '';

        // 動畫效果
        await this.spinReels(this.fruitReels, this.fruits);
        await this.spinReels(this.numberReels, this.numbers);

        this.checkResult();
        this.isSpinning = false;
        this.startButton.disabled = false;
    }

    async spinReels(reels, symbols) {
        const spinDuration = 2000; // 2秒
        const intervals = 50; // 更新間隔
        
        return new Promise(resolve => {
            let time = 0;
            const interval = setInterval(() => {
                this.randomizeReels(reels, symbols);
                time += intervals;
                
                if (time >= spinDuration) {
                    clearInterval(interval);
                    resolve();
                }
            }, intervals);
        });
    }

    checkResult() {
        const fruitResults = Array.from(this.fruitReels).map(reel => reel.textContent);
        const numberResults = Array.from(this.numberReels).map(reel => reel.textContent);

        const fruitMatch = this.checkMatch(fruitResults);
        const numberMatch = this.checkMatch(numberResults);

        if (fruitMatch && numberMatch) {
            this.resultDisplay.textContent = "恭喜你得特獎！";
        } else if (fruitMatch || numberMatch) {
            this.resultDisplay.textContent = "恭喜你得打8折獎！";
        } else {
            this.resultDisplay.textContent = "謝謝你！再接再勵";
        }
    }

    checkMatch(results) {
        return results.every(symbol => symbol === results[0]);
    }
}

// 初始化遊戲
window.addEventListener('DOMContentLoaded', () => {
    new SlotMachine();
}); 
