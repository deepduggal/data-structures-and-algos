interface Array<T> {
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

interface StaticArray<T> extends Array<T> {

}