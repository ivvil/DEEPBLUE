import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2 } from 'three/src/Three.Core.js';

export class Ship {
    // 1. Added trailing slash to model path
    static #modelPath = "models/kenney_watercraft-pack/Models/GLB format/";
    static #loader = new GLTFLoader();
    static #modelSize = {
        3: [
            'ship-cargo-a',
            'ship-cargo-b',
            'ship-cargo-c',
            'ship-large',
            'ship-ocean-liner'
        ],
        2: [
            'ship-ocean-liner-small',
            'ship-small',
            'ship-small-ghost',
            'boat-sail-a',
            'boat-sail-b'
        ],
        1: [
            'boat-row-large',
            'boat-row-small',
            'boat-fan'
        ]
    };

    model;
    size;
    dir;
    pos; // 2. Added missing pos property declaration

    constructor(size, pos, dir = new Vector2().random()) {
        this.size = size;
        this.pos = pos;
        this.dir = dir.normalize(); // 3. Normalize direction vector

        // 4. Select random model based on size
        const models = Ship.#modelSize[this.size];
        if (!models) {
            throw new Error(`Invalid ship size: ${size}`);
        }
        const modelName = models[Math.floor(Math.random() * models.length)];
        this.model = `${modelName}.glb`; // 5. Add .glb extension
    }

    static render(scene, ship) {
        const modelPath = Ship.#modelPath + ship.model;
        Ship.#loader.load(modelPath, 
            (gltf) => {
                // 6. Use gltf.scene instead of gltf
                const model = gltf.scene;
                
                // 7. Set position and rotation based on ship properties
                model.position.set(ship.pos.x, 0, ship.pos.y);
                model.rotation.y = Math.atan2(ship.dir.y, ship.dir.x);
                
                scene.add(model);
            }, 
            undefined, 
            (err) => {
                console.error('Error loading ship model:', err);
            }
        );
    }
}