import type { GameObject } from "./GameObject";

class Component {
    /**
     * 
     * @param {GameObject} gameObject GameObject to store
     */
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    update() {}
}