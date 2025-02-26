import { Object3D } from "three";

export class GameObject {

    /**
     * Represents game objects in a tree like structure
     * @param {Object3D} parent Parent object
     * @param {string} name Object name
     */
    constructor(parent, name) {
        this.name = name;
        this.components = new Array;
        this.transform = new Object3D;
        parent.add(this.transform);
    }

    /**
     * Instantiates a component of ComponentType, adds it to the component tree and also returns the instance
     * @param {any} ComponentType The component type to add
     * @param  {...any} args Args to pass to the component constructor
     * @returns The new component
     */
    addComponent(ComponentType, ...args) {
        const comp = new ComponentType(this, ...args);
        this.components.push(comp);
        return comp;
    }


    /**
     * Remove a component from the children
     * @param {any} component Component to remove
     */
    removeComponent(component) {
        const ndx = this.components.indexOf(component);
        if (ndx >= 0) {
            this.components.splice(ndx, 1);
        }
    }

    /**
     * Gets a component from the component array from it's type
     * @param {any} ComponentType Type of the component to get
     * @returns Instance of the component
     */
    getComponent(ComponentType) {
        return this.components.find(c => c instanceof ComponentType);
    }

    update() {
        for (const component of this.components) {
            component.update();
        }
    }


}