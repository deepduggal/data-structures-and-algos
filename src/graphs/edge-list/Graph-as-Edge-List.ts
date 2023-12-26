/**
 * A vertex in a graph. Each vertex has a value.
 */
interface Vertex {
  value: any;
}

// Exactly two vertices with an implicit direction.
interface Edge {
  from: Vertex;
  to: Vertex;
  // @todo Add edge weight
}

/**
 * A set of unique edges. Each edge is a pair of vertices.
 */
interface EdgeList {
  // vertices: Set<Vertex>; // A set of unique vertices. The underlying storage for the set of unique edges. @todo this is an implementation detail
  edges: Set<TestEdge>; // A set of unique edges.
  /**
   * Add an edge to the edge list. If the vertices are not already in the list, adds them.
   */
  addEdge(): void;
  /**
   * Remove an edge from the edge list. If the vertices are not connected to any other edges, removes them.
   */
  removeEdge(edge: TestEdge): void;

}

class VertexImpl implements Vertex {
  constructor(value: any) {
    this.value = value;
  }
}