/**
 * Graph - Adjacency List
 */

class GraphNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  // Add a node as a child of this node
  add(data) {
    this.children.push(new GraphNode(data));
  }

  // Remove a child node
  remove() {
    
  }
}

export default GraphNode;