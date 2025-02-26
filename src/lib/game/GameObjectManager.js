import { SafeArray } from "$lib/SafeArray";
import { GameObject } from "./GameObject";

export class GameObjectManager {
    constructor() {
        this.gameObjects = new SafeArray();
    }

    createObject(parent, name) {
        const gameObject = new GameObject(parent, name);
        this.gameObjects.add(gameObject);
        return gameObject;
    }

    removeGameObject(gameObject) {
        this.gameObjects.remove(gameObject);
    }

    update() {
        this.gameObjects.forEach(gameObject => gameObject.update());
    }
}