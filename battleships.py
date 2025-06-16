import random
import string
from typing import List, Tuple, Set

class Ship:
    def __init__(self, size: int):
        self.size = size
        self.hits: Set[Tuple[int, int]] = set()
        self.positions: List[Tuple[int, int]] = []

    def is_sunk(self) -> bool:
        return len(self.hits) == self.size

    def add_position(self, position: Tuple[int, int]):
        self.positions.append(position)

class Board:
    def __init__(self, size: int = 10):
        self.size = size
        self.grid = [['~' for _ in range(size)] for _ in range(size)]
        self.ships: List[Ship] = []
        self.shots: Set[Tuple[int, int]] = set()

    def place_ship(self, ship: Ship, start_pos: Tuple[int, int], is_horizontal: bool) -> bool:
        row, col = start_pos
        positions = []
        
        # Check if ship can be placed
        for i in range(ship.size):
            if is_horizontal:
                if col + i >= self.size or self.grid[row][col + i] != '~':
                    return False
                positions.append((row, col + i))
            else:
                if row + i >= self.size or self.grid[row + i][col] != '~':
                    return False
                positions.append((row + i, col))

        # Place the ship
        for pos in positions:
            ship.add_position(pos)
            self.grid[pos[0]][pos[1]] = 'S'
        
        self.ships.append(ship)
        return True

    def place_ships_randomly(self):
        ships_to_place = [
            Ship(5),  # Battleship
            Ship(4),  # Destroyer 1
            Ship(4),  # Destroyer 2
        ]

        for ship in ships_to_place:
            placed = False
            while not placed:
                is_horizontal = random.choice([True, False])
                if is_horizontal:
                    row = random.randint(0, self.size - 1)
                    col = random.randint(0, self.size - ship.size)
                else:
                    row = random.randint(0, self.size - ship.size)
                    col = random.randint(0, self.size - 1)
                
                placed = self.place_ship(ship, (row, col), is_horizontal)

    def take_shot(self, position: Tuple[int, int]) -> str:
        if position in self.shots:
            return "already_shot"
        
        self.shots.add(position)
        row, col = position
        
        for ship in self.ships:
            if position in ship.positions:
                ship.hits.add(position)
                self.grid[row][col] = 'X'
                return "sunk" if ship.is_sunk() else "hit"
        
        self.grid[row][col] = 'O'
        return "miss"

    def all_ships_sunk(self) -> bool:
        return all(ship.is_sunk() for ship in self.ships)

    def display(self, hide_ships: bool = True):
        # Print column headers
        print("  " + " ".join(string.ascii_uppercase[:self.size]))
        
        # Print grid
        for i in range(self.size):
            row = [str(i + 1).rjust(2)]
            for j in range(self.size):
                cell = self.grid[i][j]
                if hide_ships and cell == 'S':
                    cell = '~'
                row.append(cell)
            print(" ".join(row))

class Game:
    def __init__(self):
        self.board = Board()
        self.board.place_ships_randomly()

    def parse_coordinates(self, coord: str) -> Tuple[int, int]:
        if len(coord) < 2 or len(coord) > 3:
            raise ValueError("Invalid coordinate format")
        
        col = coord[0].upper()
        if col not in string.ascii_uppercase[:10]:
            raise ValueError("Column must be A-J")
        
        try:
            row = int(coord[1:]) - 1
            if not 0 <= row < 10:
                raise ValueError("Row must be 1-10")
        except ValueError:
            raise ValueError("Invalid row number")
        
        return (row, ord(col) - ord('A'))

    def play(self):
        print("Welcome to Battleships!")
        print("Enter coordinates (e.g., A5) to fire. Type 'quit' to exit.")
        
        while True:
            print("\nCurrent board:")
            self.board.display()
            
            coord = input("\nEnter coordinates to fire: ").strip()
            if coord.lower() == 'quit':
                print("Thanks for playing!")
                break
            
            try:
                position = self.parse_coordinates(coord)
                result = self.board.take_shot(position)
                
                if result == "already_shot":
                    print("You already fired at this position!")
                elif result == "hit":
                    print("Hit!")
                elif result == "miss":
                    print("Miss!")
                elif result == "sunk":
                    print("Ship sunk!")
                
                if self.board.all_ships_sunk():
                    print("\nCongratulations! You've sunk all the ships!")
                    self.board.display(hide_ships=False)
                    break
                    
            except ValueError as e:
                print(f"Error: {e}")

if __name__ == "__main__":
    game = Game()
    game.play() 