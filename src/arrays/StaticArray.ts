interface IArray<T> {
  length: number;
  /**
   * Access an element at a given index.
   */
  get(index: number): T;
  /**
   * Sets an element at a given index.
   * @param index 
   * @param value 
   */
  set(index: number, value: T): void;
  push(value: T): void;
  pop(): T;
}

interface StaticArray<T> extends IArray<T> {

}

/**
 * A fixed-length array, that doesn't auto resize, whose values are the same type.
 */
class StaticArray<T> implements StaticArray<T> {
  // type ArrayIndex = number;
  // type ArrayValue = T | undefined;
  private data: Record<string, T | undefined>;
  public length: number;

  constructor(size: number) {
    this.data = {};
    Object.seal(this.data);
    this.length = size;

    // Allocate pointers/memory
    for (let i = 0; i < this.length; i++) {
      this.data[i.toString()] = undefined;
    }
  }

  get(index: number) {
    if (this.has(index)) {
      const indexStr = index.toString();
      return this.data[indexStr];
    }
    return undefined;
  }

  set(index: number, value: T | undefined) {
    if (this.has(index)) {
      const indexStr = index.toString();
      this.data[indexStr] = value;
    } else {
      throw RangeError('Index doesn\'t exist');
    }
  }

  has(index: number) {
    if (this.data[index.toString()]) {
      return true;
    }
    return false;
  }
  // push() {

  // }
  // pop() {

  // }
}