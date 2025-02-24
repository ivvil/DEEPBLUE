import { Vector2 } from "three/src/Three.Core.js";
import { Ship } from "./Ship.js";

export class Game {
    static #ROWS = 10;
    static #COLS = 10;

    /**
     * Ships that will be placed in the field and their size
     */
    static #PIECES = [
        { size: 3, amount: 2 },
        { size: 2, amount: 3 },
        { size: 1, amount: 4 }
    ];

    #scene;
    #field = [];
    #playfield;

    constructor(scene, playfield) {
        this.#scene = scene;
        this.#playfield = playfield;
        this.#initField();
    }

    #initField() {
        this.#field = Array.from({ length: Game.#ROWS }, () => 
            Array(Game.#COLS).fill(false)
        );
    }

    rndmField() {
        Game.#PIECES.forEach(piece => {
            for (let i = 0; i < piece.amount; i++) {
                this.randomShip(piece.size);
            }
        });
    }

    randomShip(size) {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
            attempts++;
            const gridX = Math.floor(Math.random() * Game.#COLS);
            const gridY = Math.floor(Math.random() * Game.#ROWS);
            const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            
            let tl, br;
            if (direction === 'horizontal') {
                tl = new Vector2(gridX, gridY);
                br = new Vector2(gridX + size - 1, gridY);
            } else {
                tl = new Vector2(gridX, gridY);
                br = new Vector2(gridX, gridY + size - 1);
            }

            if (this.canShipSpawn(tl, br)) {
                const dirVector = this.#getDirectionVector(direction);
                const ship = new Ship(
                    size,
                    gridX,
                    gridY,
                    dirVector
                );
                Ship.render(this.#scene, ship, this.#playfield);
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
        if (tl.x < 0 || tl.y < 0 || br.x >= Game.#COLS || br.y >= Game.#ROWS) {
            return false;
        }

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

    placeAllShips() {
        Game.#PIECES.forEach(piece => {
            for (let i = 0; i < piece.amount; i++) {
                this.randomShip(piece.size);
            }
        });
    }
}