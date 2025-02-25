import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Box3, Vector2, Vector3 } from 'three';

export class Ship {
    static #modelPath = "/models/kenney_watercraft-pack/Models/GLB format/";
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
    gridX;
    gridY;
    dir;

    constructor(size, gridX, gridY, dir = new Vector2(1, 0)) {
        this.size = size;
        this.gridX = gridX;
        this.gridY = gridY;
        this.dir = dir.normalize();

        const models = Ship.#modelSize[this.size];
        if (!models) {
            throw new Error(`Invalid ship size: ${size}`);
        }
        const modelName = models[Math.floor(Math.random() * models.length)];
        this.model = `${modelName}.glb`;
    }

    static render(scene, ship, playfield) {
        const modelPath = Ship.#modelPath + ship.model;
        Ship.#loader.load(modelPath, 
            (gltf) => {
                const model = gltf.scene;

                // Calculate rotation (convert from 2D direction to 3D rotation)
                const angle = Math.atan2(ship.dir.y, ship.dir.x);
                model.rotation.set(
                    Math.PI / 2,  // Convert from Z-up to Y-up
                    0,
                    angle
                );
                
                // Calculate original dimensions
                const bbox = new Box3().setFromObject(model);
                const originalSize = new Vector3();
                bbox.getSize(originalSize);

                // Calculate scaling factors
                const targetLength = ship.size;
                const targetWidth = 1;
                const scale = new Vector3(
                    targetWidth / originalSize.x,
                    1 / originalSize.y,  // Maintain vertical proportions
                    targetLength / originalSize.z
                );

                // Apply scaling
                model.scale.copy(scale);

                // Get grid-aligned position
                const worldPos = playfield.getWorldPosition(ship.gridX, ship.gridY);

                
                // Position adjustments for ship orientation
                const offset = new Vector3(
                    -originalSize.z * scale.z * 0.5 * ship.dir.x,
                    -originalSize.z * scale.z * 0.5 * ship.dir.y,
                    0.1
                );

                model.position.copy(worldPos.add(offset));

                scene.add(model);
            }, 
            undefined, 
            (err) => {
                console.error('Error loading ship model:', err);
            }
        );
    }
}
