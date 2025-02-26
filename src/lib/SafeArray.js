import { element } from "three/tsl";

export class SafeArray {
    constructor() {
        this.array = [];
        this.addQueue = [];
        this.removeQueue = new Set();
    }

    get isEmpty() {
        return this.addQueue.length + this.array.length > 0;
    }

    add(elm) {
        this.addQueue.push(elm);
    }

    remove(elm) {
        this.removeQueue.add(elm);
    }

    forEach(fn) {
        this._addQueued();
        this._removeQueued();

        for (const elm of this.array) {
            if (this.removeQueue.has(elm)) {
                continue;
            }

            fn(element);
            
        }

        this._removeQueued();
    }

    _addQueued() {
        if (this.addQueue.length) {
            this.array.splice(this.array.length, 0, ...this.addQueue);
            this.addQueue = [];
        }
    }

    _removeQueued() {
        if (this.removeQueue.size) {
            this.array = this.array.filter(elm => !this.removeQueue.has(elm));
            this.removeQueue.clear();
        }
    }
}