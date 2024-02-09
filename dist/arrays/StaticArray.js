"use strict";
/**
 * A fixed-length array, that doesn't auto resize, whose values are the same type.
 */
class StaticArray {
    constructor(size) {
        this.data = {};
        Object.seal(this.data);
        this.length = size;
        // Allocate pointers/memory
        for (let i = 0; i < this.length; i++) {
            this.data[i.toString()] = undefined;
        }
    }
    get(index) {
        if (this.has(index)) {
            const indexStr = index.toString();
            return this.data[indexStr];
        }
        return undefined;
    }
    set(index, value) {
        if (this.has(index)) {
            const indexStr = index.toString();
            this.data[indexStr] = value;
        }
        else {
            throw RangeError('Index doesn\'t exist');
        }
    }
    has(index) {
        if (this.data[index.toString()]) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=StaticArray.js.map