interface LinkedListNode {
  value: any;
  next: LinkedListNode | null;
}

interface LinkedList {
  add(value: any): void;
  remove(value: any): void;
  isEmpty(): boolean;
  poll(): LinkedListNode | null;
  peek(): LinkedListNode | null;
}

// interface SinglyLinkedList extends LinkedList {

// }

// interface DoublyLinkedList extends LinkedList {

// }