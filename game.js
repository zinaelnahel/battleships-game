class Ship {
    constructor(size) {
        this.size = size;
        this.hits = 0;
        this.positions = [];
    }

    isSunk() {
        return this.hits === this.size;
    }
}

class Game {
    constructor() {
        this.boardSize = 10;
        this.ships = [
            new Ship(5),  // Battleship
            new Ship(4),  // Destroyer 1
            new Ship(4)   // Destroyer 2
        ];
        this.grid = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(null));
        this.shots = new Set();
        this.gameBoard = document.getElementById('game-board');
        this.messageBox = document.getElementById('message-box');
        this.newGameBtn = document.getElementById('new-game-btn');
        
        this.initializeGame();
        this.setupEventListeners();
    }

    initializeGame() {
        // Clear the game board
        this.gameBoard.innerHTML = '';
        this.shots.clear();
        this.ships.forEach(ship => {
            ship.hits = 0;
            ship.positions = [];
        });
        this.grid = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(null));
        
        // Create the grid cells
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                this.gameBoard.appendChild(cell);
            }
        }

        // Place ships randomly
        this.placeShips();
        this.updateShipStatus();
    }

    placeShips() {
        this.ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                const isHorizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * this.boardSize);
                const col = Math.floor(Math.random() * (this.boardSize - (isHorizontal ? ship.size : 0)));

                if (this.canPlaceShip(ship, row, col, isHorizontal)) {
                    this.placeShip(ship, row, col, isHorizontal);
                    placed = true;
                }
            }
        });
    }

    canPlaceShip(ship, row, col, isHorizontal) {
        for (let i = 0; i < ship.size; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
            if (r >= this.boardSize || c >= this.boardSize || this.grid[r][c] !== null) {
                return false;
            }
        }
        return true;
    }

    placeShip(ship, row, col, isHorizontal) {
        for (let i = 0; i < ship.size; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
            this.grid[r][c] = ship;
            ship.positions.push([r, c]);
        }
    }

    setupEventListeners() {
        this.gameBoard.addEventListener('click', (e) => {
            const cell = e.target;
            if (cell.classList.contains('cell') && !cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.makeMove(row, col, cell);
            }
        });

        this.newGameBtn.addEventListener('click', () => {
            this.initializeGame();
            this.messageBox.textContent = 'New game started! Click on the grid to fire.';
        });
    }

    makeMove(row, col, cell) {
        const position = `${row},${col}`;
        if (this.shots.has(position)) {
            return;
        }

        this.shots.add(position);
        const ship = this.grid[row][col];

        if (ship) {
            ship.hits++;
            cell.classList.add('hit');
            cell.textContent = '💥';
            
            if (ship.isSunk()) {
                this.messageBox.textContent = 'Ship sunk!';
            } else {
                this.messageBox.textContent = 'Hit!';
            }
        } else {
            cell.classList.add('miss');
            cell.textContent = '💦';
            this.messageBox.textContent = 'Miss!';
        }

        this.updateShipStatus();

        if (this.checkGameOver()) {
            this.messageBox.textContent = 'Congratulations! You\'ve sunk all the ships!';
            this.gameBoard.style.pointerEvents = 'none';
        }
    }

    updateShipStatus() {
        document.getElementById('battleship-hits').textContent = this.ships[0].hits;
        document.getElementById('destroyer1-hits').textContent = this.ships[1].hits;
        document.getElementById('destroyer2-hits').textContent = this.ships[2].hits;
    }

    checkGameOver() {
        return this.ships.every(ship => ship.isSunk());
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new Game();
}); 