import type { IVertex, AdjacencyList } from "../graph-types"

/**
 * # A Directed Acyclic Graph, currently unweighted
 * @todo Add weights
 * @todo Make Directed Graph that allows for cycles
 */
interface DAG {

  /** # instance properties */
  // adjacencyList: AdjacencyList;

  /** # Access Methods */
  /** Gets the children (directed neighbors to) of the vertex. */
  getChildrenOf(v: IVertex): Set<IVertex>

  /** ## For fun, debugging, or practice */
  // print(): string //toString

  /** # Modify Edges */
  // A map of nodes to their children. It's part of the class!
  // adjacencyList: AdjacencyList;

  // Add an edge to the graph.
  addEdge(from: IVertex, to: IVertex): void;
  // Remove an edge from the graph.
  removeEdge(from: IVertex, to: IVertex): void;

  /** # Checking Methods - Computed Values, mostly boolean result */
  isMember(v: IVertex): boolean
  isEmpty(): boolean
  hasEdge(v: IVertex): boolean

  /** # Direction-constrained checking methods */
  hasEdgeFrom(v: IVertex): boolean
  hasEdgeTo(v: IVertex): boolean

  /** # Traversal */
  /** ## Path Finding Methods */
  hasDirectedPathDFS(from: IVertex, to: IVertex): boolean
  hasDirectedPathBFS(from: IVertex, to: IVertex): boolean
  // hasPathDijkstra(from: IVertex, to: IVertex): boolean
  // hasPathBellmanFord(from: IVertex, to: IVertex): boolean
  // hasPathAStar(from: IVertex, to: IVertex): boolean
}

export class Vertex implements IVertex {
  value: any;
  children: IVertex[];

  constructor(value: any) {
    this.value = value;
    this.children = [];
  }
}

/**
 * # Unweighted Directed Acyclic Graph (DAG).
 * - Represented with an Adjacency List.
 * - Can have disjoint subgraphs and hanging vertices (vertices with no edges).
 * 
 * ## Overview
 * 
 * @see {@link IVertex}
 * @see {@link Graph} & {@link DAG}
 */
export class DAG implements DAG {
  const private adjacencyList: AdjacencyList = new Map();

  /* Access Methods */


  /* Access computed properties */

  /**
   * Get a read-only list of unique vertices
   */
  // public getVertexList(): IVertex[] {
  //   return Array.from(this.adjacencyList.keys()); // nope bc references!
  // }

  /**
   * Get a read-only list of edges
   */
  // public toEdgeList(): [IVertex, IVertex][] {
  //   this.adjacencyList
  // }

  public get numVertices(): number {
    return this.adjacencyList.size;
  }

  public get countDirectedEdges(): number {
    let edges: number = 0;
    // Iterate over each vertex
    this.adjacencyList.forEach((children) => {
      edges += children.size;
    });
    return edges;
  }

  public getChildrenOf(v: IVertex) {
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
   * Check if this graph instance has the given vertex as an element.
   * @param v 
   */
  public isMember(v: IVertex) {
    return this.adjacencyList.has(v);
  }

  /**
   * Checks if the graph has members
   */
  public isEmpty(): boolean {
    return this.adjacencyList.size > 0;
  }

  private hasChildren(v: IVertex): boolean {
    if (this.isMember(v)) {
      const children = this.getChildrenOf(v);
      return children!.size > 0;
    }
    return false;
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
   * Remove a vertex as a key in the graph, if it has no edges. Used when removing an edge and a vertex is hanging (has no edges).
   */
  private pruneVertex(vertex: IVertex) {
    if (this.isMember(vertex)) this.adjacencyList.delete(vertex);
  }

  /**
   * Adds an edge between two vertices.
   * Handles adding new nodes as needed.
   * @todo disallow adding cycles by checking the entire path at time of addition
   */
  public addEdge(from: IVertex, to: IVertex): void {
    // Add the (from) vertex if it doesn't exist as a key
    if (!this.isMember(from)) {
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
  public removeEdge(from: IVertex, to: IVertex): void {
    if (this.isMember(from) && this.isMember(to)) {
      // Remove from -> to edge
      const fromsChildren = this.getChildrenOf(from);
      fromsChildren?.delete(to); // Removes child if it exists

      // @todo Edge case: Hanging vertex/subgraph - auto-delete or not?
      // - Make sure we didn't remove a bridge. ex. a -> b -> c -> d, if we remove (b -> c), should nodes that don't connect back to the from side be removed?
      // - If to now has no more edges, remove it from the graph

      // Remove to or from if they are now hanging (no edges). Doesn't remove subgraphs and can leave hanging subgraphs.
      [to, from].forEach((vertex) => {
        if (!this.hasEdge(vertex)) this.pruneVertex(vertex);
      });

      // Check if any vertex connects to the to vertex in this graph
      // If nothing connects to the to vertex, remove it's key from the graph
    }
  }

  /**
   * Determine if any vertex has at least 1 directed edge to the given vertex, meaning anyVertex -> vertex.
   */
  // public hasEdgeTo(v: IVertex): boolean {
  //   const vertices = this.adjacencyList;
  //   vertices.forEach((children, from) => {
  //     if (children.has(v)) {
  //       return true;
  //     }
  //   });
  //   return false;
  // }

  /**
   * Determine if a vertex has at least 1 directed edge from it to another vertex, meaning vertex -> anyVertex.
   * @todo Double check or automate test of this code please
   */
  public hasEdgeFrom(v: IVertex): boolean {
    // Just check the children, since this graph is represented as an adjacency list
    // @todo Handle self as a child (edge to self. yes it's a cycle)
    const children = this.getChildrenOf(v);
    if (children && children.size >= 1) {
      return true;
    }
    return false;
  }

  /** Determine if a vertex has at least 1 edge from or to it */
  public hasEdge(v: IVertex): boolean {
    return this.hasEdgeFrom(v) || this.hasEdgeTo(v);
  }

  /**
   * Determine if there is a path from one vertex to another using DFS.
   * @todo Implement
   * 
   * ![Adjacency List Visual](https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/27029/images/FVKdPFTlTmyXQBiypTge_375dbebabc31445637557c91ec1fe4de.jpg)
   * 
   * @example
   * // Good graph for DFS (deep paths)
   * {
   *   a: [b, c]
   *   b: []
   *   c: []
   *  }
   * @see {@link IVertex} DFS example:
  */
  public hasDirectedPathDFS(from: IVertex, to: IVertex): boolean {
    if (this.isMember(from)) return false; // return early

    // Check for a match (bc from changes to next vertex "down" as we traverse)
    if (from.value === to.value) return true; // @todo support object.is too along with primitive equality

    // Continue traversing "downward"
    const children = this.getChildrenOf(from);
    for (const child of children) {
      if (this.hasDirectedPathDFS(child, to)) return true;
    }

    // No match
    return false;
  }

  /**
   * Determine if there is a path from one vertex to another using BFS.
   * @todo Implement
   */
  public hasDirectedPathBFS(from: IVertex, to: IVertex): boolean {
    const queue = [from]; // start with from
    // if (this.isMember(from)) return false; // return early

    while (queue.length) {

      // Dequeue a vertex
      const current = queue.shift();

      // Check for match
      if (current!.value === to.value) return true; // @todo support object.is too along with primitive equality

      // Enqueue current vertex's children for (breadth-first) traversal
      const children = this.getChildrenOf(current);
      if (children && children.size > 0) {
        children.forEach(child => {
          queue.push(child);
        });
      }
    }
    return false;
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
//     graph.addEdge(new Vertex(fromVal), new Vertex(toVal));
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
