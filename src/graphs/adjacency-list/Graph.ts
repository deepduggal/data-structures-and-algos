/**
 * Graph - Adjacency List
 */

/**
 * Represents a vertex in a graph.
 * Each vertex has a value. And in an adjacency list, each vertex has children.
 */
interface Vertex {
  value: any;
  children: Vertex[];
}


/** A map of single vertices to their children.
 * Remember children are not neighbors (neighbor's in one direction).
 * Not best choice for undirected graph, since implementation includes direction. @todo Implement an undirected adjacency list (for less memory and faster traversal and deletion). */
type AdjacencyList = Map<Vertex, Set<Vertex>>;

/**
 * Represents a graph.
 */
interface Graph {
  // A map of nodes to their children. It's part of the class!
  // adjacencyList: AdjacencyList;

  // Add an edge to the graph.
  addEdge(from: Vertex, to: Vertex): void;
  // Remove an edge from the graph.
  removeEdge(from: Vertex, to: Vertex): void;
}

class VertexImpl implements Vertex {
  value: any;
  children: Vertex[];

  constructor(value: any) {
    this.value = value;
    this.children = [];
  }
}

class Graph implements Graph {
  const private adjacencyList: AdjacencyList = new Map();

  /** Gets the children of the vertex. */
  private getChildrenOf(v: Vertex) {
    // Return null early
    if (this.isEmpty() || !this.isMember(v)) return null;

    // Return the children if there is at least 1
    const children = this.adjacencyList.get(v);
    if (children && children?.size > 0) {
      return this.adjacencyList.get(v);
    }
    // Default to null - Member with no children
    return null;
  }

  /**
   * Check if the given vertex exists in this graph instance.
   * @param v 
   */
  private isMember(v: Vertex) {
    return this.adjacencyList.has(v);
  }

  /**
   * Checks if the graph has members
   */
  private isEmpty(): boolean {
    return this.adjacencyList.size > 0;
  }

  /** Check if this graph has the given vertex as an element */
  private hasVertex(vertex: Vertex) {
    return this.adjacencyList.has(vertex);
  }

  // /** Checks if a vertex has at least one edge */
  // private hasEdge(vertex: Vertex) {
  //   // Has one or more children that connect (to something other than the provided node)
  //   // OR a vertex has the provided node as a child
  //   this.adjacencyList.forEach((vertex) => {
  //     if () {

  //     }
  //   });
  // }

  /**
   * Remove a vertex if it has no edges. Used when removing an edge and a vertex is hanging (has no edges).
   */
  private pruneVertex(vertex: Vertex) {

  }

  /**
   * Adds an edge between two vertices.
   * Handles adding new nodes as needed.
   */
  public addEdge(from: Vertex, to: Vertex): void {
    // Add the (from) vertex if it doesn't exist as a key
    if (!this.hasVertex(from)) {
      const neighbors = new Set([to]);
      this.adjacencyList.set(from, neighbors)
    }
    // Or just add the (to) vertex as a neighbor if it's a new edge
    else {
      const neighbors = this.getChildrenOf(from);
      if (!neighbors?.has(to)) neighbors!.add(to);
    }
  }

  /**
   * Removes an edge between two vertices.
   * Calls this.pruneVertices to remove vertices that become hanging (not part of the graph) as part of the edge removal
   * @param from
   * @param to 
   */
  public removeEdge(from: Vertex, to: Vertex): void {
    /**
     * Since this is an adjacency list, and since each edge has one direction:
     * 1. Remove @param from -> @param to edge. Modify @param from's children by removing @param to.
     *   - Implementation notes: adjacencyList.private getChildren(from).removeChild(to). Stored as this.adjacencyList[from].
     * 2. If to now has no children, then check for edges directed to it (is child of other vertices?). Otherwise remove it bc it's now hanging.
     *   Need to check if any other vertex (for each) has to as a child.
     *  Implementation notes: for each vertex, if any (other than from) has to as a child the don't remove to node from graph, otherwise remove it.
     */
    if (this.hasVertex(from)) {
      // Delete child vertex
      const fromsChildren = this.getChildrenOf(from);
      const didDelete = fromsChildren?.delete(to); // Removes child if it exists

      // We may have removed the last connection to the from or to nodes. Check if from or to are now hanging nodes (no edges). Remove either if it's hanging.
      // If from now has no children, check if it is a child of another vertex
      if (fromsChildren && fromsChildren.size === 0 && didDelete) {
        let toVertexHasOtherEdges = false;
        // 
        this.adjacencyList.forEach((children, vertex) => {
          // Skip checking children of from vertex
          if (vertex !== from) {
            // Check if to is a child of any vertex
            if (this.getChildrenOf(vertex)?.has(to)) {
              toVertexHasOtherEdges = true;
              // break; other than removing that edge
            }
          }
        });
        // Remove vertex from adjacency list if it doesn't have children
        if (!toVertexHasOtherEdges) { this.pruneVertex(to); }

        // Make sure we didn't remove a bridge
        // - Edge case: Connecting to self
        // 1. Check that from has something that connects to it (make sure we didn't remove a bridge), otherwise remove from
        // 2. Check that to has something that connects to it, otherwise remove it
        [from, to].forEach((vertex) => {
          if (!this.hasEdge(vertex)) this.pruneVertex(vertex);
        });
        // Check if any vertex connects to the to vertex in this graph
        // If nothing connects to the to vertex, remove it's key from the graph and remove any of it's children that don't connect without to too
      }
    }
  }

  /**
   * Determine if any vertex has at least 1 directed edge to the given vertex, meaning anyVertex -> vertex.
   */
  private hasEdgeTo(to: Vertex): boolean {
    const vertices = this.adjacencyList;
    vertices.forEach((children, from) => {
      if (children.has(to)) {
        return true;
      }
    });
    return false;
  }

  /**
   * Determine if a vertex has at least 1 directed edge from it to another vertex, meaning vertex -> anyVertex.
   */
  private hasEdgeFrom(from: Vertex): boolean {
    // Just check the children, since this graph is represented as an adjacency list
    const children = this.getChildrenOf(from);
    // @todo Double check or automate test of this code please
    if (children && children.size >= 1 && children.) {
      return true;
    }
    return false;
  }

  /** Determine if a vertex has at least 1 edge from or to it */
  private hasEdge(vertex): boolean {
    return this.hasEdgeFrom(vertex) || this.hasEdgeTo(vertex);
  }
}


// /**********************
//  * Tests
//  * @todo move
//  */

// /**
//  * Make these graphs:
//  * - simple: a -> b -> c
//  * - simple w/ 1 cycle: a -> b -> c -> a
//  */

// // Types for easily populating graphs
// type TestEdge = [Vertex, Vertex];
// type TestEdgeList = TestEdge[]; // @todo should ensure uniqueness

// /**
//    * Quickly add edges from starting data (only array of objects as edge list for now, intended for quick testing)
//    * @param startingData - The list of edges to use to populate from
//    */
// function createTestGraph(startingData: TestEdgeList): Graph {
//   const graph = new Graph();
//   // Add edges
//   startingData.forEach(([fromVal, toVal]) => {
//     graph.addEdge(new VertexImpl(fromVal), new VertexImpl(toVal));
//   });
// }

// /**
//  * Map of readable name to test data of each graph for readable code
//  * Each entry is a 2d array edge list.
// */
// const testData = {
//   simple: [['a', 'b'], ['b', 'c']],
//   simpleWithCycle: [['a', 'b'], ['b', 'c'], ['c', 'a']]
// }

// Object.entries(testData).forEach((value, index) => {
//   const testGraph = createTestGraph(value);

//   // Try adding edges
//   [['d', 'e'], ['e', 'f']].forEach(edge => testGraph.addEdge(...edge));

//   // Try removing some edges we added
// });
