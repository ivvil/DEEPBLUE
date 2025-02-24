import { Vector2 } from "three/src/Three.Core.js";
import { Ship } from "./Ship.js"; // Assuming Ship class is in same directory

export class Game {
    static #ROWS = 10;
    static #COLS = 10;

    static #PIECES = [
        { size: 3, amount: 2 },
        { size: 2, amount: 3 },
        { size: 1, amount: 4 }
    ];

    #scene;
    #field = [];

    constructor(scene) {
        this.#scene = scene;
        this.#initField();
    }

    #initField() {
        // Create 2D array representing game field
        this.#field = Array.from({ length: Game.#ROWS }, () => 
            Array(Game.#COLS).fill(false)
        );
    }

    rndmField() {
        Game.#PIECES.forEach(piece => {
            
        });
    }

    randomShip(size) {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
            attempts++;
            // Generate random position (zero-based indices)
            const initPos = new Vector2(
                Math.floor(Math.random() * Game.#COLS),
                Math.floor(Math.random() * Game.#ROWS)
            );
            
            // Random direction (horizontal/vertical)
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            
            // Calculate boundaries
            let tl, br;
            if (direction === 'horizontal') {
                tl = new Vector2(initPos.x, initPos.y);
                br = new Vector2(initPos.x + size - 1, initPos.y);
            } else {
                tl = new Vector2(initPos.x, initPos.y);
                br = new Vector2(initPos.x, initPos.y + size - 1);
            }

            if (this.canShipSpawn(tl, br)) {
                // Create ship and add to scene
                const ship = new Ship(size, initPos, this.#getDirectionVector(direction));
                Ship.render(this.#scene, ship);
                
                // Mark cells as occupied
                this.#markShipPosition(tl, br);
                placed = true;
                return ship;
            }
        }
        console.warn(`Failed to place ship of size ${size} after ${attempts} attempts`);
        return null;
    }

    #getDirectionVector(direction) {
        return direction === 'horizontal' ? 
            new Vector2(1, 0) : 
            new Vector2(0, 1);
    }

    canShipSpawn(tl, br) {
        // Check boundaries
        if (tl.x < 0 || tl.y < 0 || br.x >= Game.#COLS || br.y >= Game.#ROWS) {
            return false;
        }

        // Check occupancy
        for (let y = tl.y; y <= br.y; y++) {
            for (let x = tl.x; x <= br.x; x++) {
                if (this.#field[y][x]) return false;
            }
        }
        return true;
    }

    #markShipPosition(tl, br) {
        for (let y = tl.y; y <= br.y; y++) {
            for (let x = tl.x; x <= br.x; x++) {
                this.#field[y][x] = true;
            }
        }
    }

    // Add method to place all ships according to PIECES configuration
    placeAllShips() {
        Game.#PIECES.forEach(piece => {
            for (let i = 0; i < piece.amount; i++) {
                this.randomShip(piece.size);
            }
        });
    }
}