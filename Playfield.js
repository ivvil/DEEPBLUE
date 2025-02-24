import * as THREE from 'three';

export class Playfield {
    #ROWS = 10;
    #COLS = 10;
    scene;
    ocean;
    
    constructor(scene) {
        this.scene = scene;
    }
    
    add() {
        const loader = new THREE.TextureLoader();
        loader.load(
            '/assets/ocean.jpg',
            (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 1);
                const geometry = new THREE.PlaneGeometry(this.#COLS, this.#ROWS);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                });
                this.ocean = new THREE.Mesh(geometry, material);
                this.ocean.position.set(0, 0, 0);
                this.scene.add(this.ocean);
                this.addGridLines();
            },
            undefined,
            (error) => { console.error('Error al cargar la textura:', error); }
        );
    }
    
    update(delta) {
        if (this.ocean && this.ocean.material.map) {
            this.ocean.material.map.offset.x += delta * 0.1;
        }
    }
    
    addGridLines() {
        const gridMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const gridLines = new THREE.Group();
        const halfCols = this.#COLS / 2;
        const halfRows = this.#ROWS / 2;
        for (let i = 0; i <= this.#COLS; i++) {
            const x = -halfCols + i;
            const points = [
                new THREE.Vector3(x, -halfRows, 0.01),
                new THREE.Vector3(x, halfRows, 0.01)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, gridMaterial);
            gridLines.add(line);
        }
        for (let j = 0; j <= this.#ROWS; j++) {
            const y = -halfRows + j;
            const points = [
                new THREE.Vector3(-halfCols, y, 0.01),
                new THREE.Vector3(halfCols, y, 0.01)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, gridMaterial);
            gridLines.add(line);
        }
        this.scene.add(gridLines);
    }

    getWorldPosition(gridX, gridY) {
        const cellSize = 1; // Each grid cell is 1 unit
        return new THREE.Vector3(
            gridX - this.#COLS/2 + cellSize/2,
            gridY - this.#ROWS/2 + cellSize/2,
            0.1
        );
    }
}

export default Playfield;