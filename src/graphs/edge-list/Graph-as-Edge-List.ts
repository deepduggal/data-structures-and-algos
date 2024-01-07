import type { IVertex, IDirectedWeightedEdge, AdjacencyList, Vertex } from '../adjacency-list/DAG.ts';


/** A directed, weighted edge */
class DirectedWeightedEdge implements IDirectedWeightedEdge {
  vertices: [IVertex, IVertex];
  weight: number;

  constructor(fromValue: IVertex, toValue: IVertex, weight: number = 0) {
    this.vertices = [fromValue, toValue];
    this.weight = weight;
    // @todo non-implicit direction or startingVertex
  }

  /** Get the starting vertex */
  get from() {
    return this.vertices[0];
  }

  /** Get the ending vertex */
  get to() {
    return this.vertices[1];
  }
}

/** An (undirected) edge list */
// class UndirectedEdgeList {
//   constructor(a: IVertex, b: IVertex) {
//     this.edges: [IVertex, IVertex][] = [a, b];
//   }

//   add() {
//     // Ensure uniqueness before adding
//   }

//   remove() {
//     // 
//   }
// }




/**
 * Convert an undirected edge list into an adjacency list
 * @param edgeList
 * @returns An adjacency matrix
 * 
 * Space Complexity: ?
 * Time Complexity: ?
 */
function edgeListToAdjList(edgeList: UndirectedEdgeList): AdjacencyList {
  const adjList = new Map();
  edgeList.forEach(([a, b]) => {
    // Add vertices with children
    if (!adjList.has(a)) adjList.set(a, []);
    if (!adjList.has(b)) adjList.set(b, []);
    // Add children - set enforces uniqueness
    adjList.set(a, adjList!.get(a).push(b));
    adjList.set(b, adjList!.get(b).push(a));
  });
  return adjList;
}

/**
 * Checks if an undirected edge list has a path
 * @param edgeList
 * @returns {boolean}
 * @see https://youtu.be/tWVWeAqZ0WU?t=2526
 */
function hasUndirectedPath(edgeList: UndirectedEdgeList, start: IVertex, end: IVertex): boolean {

  // Convert to adjacency list bc better for traversal
  const adjList = edgeListToAdjList(edgeList);
  const visited = new Set(); // track visited bc cycles

  // early return
  if (!adjList.has(start)) return false

  // bfs
  const queue = [start];
  while (queue.length) {
    // Dequeue
    const current = queue.shift();
    if (visited.has(current)) continue; // don't revisit (no need to add children again too)

    // Check for end of path
    if (current === end) return true; // @todo Object.is and ===
    visited.add(current); // store as visited

    // Enqueue children
    adjList.get(start)!.forEach(child => queue.push(child)); // @todo assumes start exists
  }

  return false
}

/**
 * Performs a depth-first traversal on a graph until a break condition is met.
 * Do a depth-first traversal. Call cb for every vertex...unless one vertex triggers a break condition, don't pass it to cb, and stop traversal.
 * @param graph The graph (represented as an adjacency list).
 * @param start The starting vertex for the traversal.
 * @param cb The callback function to be called for each visited vertex.
 * @param breakCondition The break condition function that stops the traversal if met. Occurs before cb is called.
 * @returns {boolean} Whether or not the break condition occurred.
 */
const forUntil = (graph: AdjacencyList, start: IVertex, cb: (v: IVertex) => void, breakCondition?: (v: IVertex) => boolean): boolean => {
  const stack = [start]; // LIFO - last added, out first

  let breakConditionOccurred = false;
  while (stack.length > 0) {
    // Do cb for vertex, unless break condition is met once
    const vertex = stack.pop()!;
    if (breakCondition && breakCondition(vertex)) {
      breakConditionOccurred = true; break;
    }
    cb(vertex);

    // Add children to stack - to handle them later
    const children = graph.get(start)!; // @todo remove !
    for (const child of children) {
      stack.push(child);
    }
  }
  return false;
};

/**
 * Count the number of connected components in an undirected graph (represented as an adjacency list).
 * 
 * @param graph The adjacency list representation of the graph.
 * @returns The number of connected components in the graph.
 * 
 * ## About Connected Components
 * A connected component is also called a component. It's really the largest non-overlapping top-level subtree, so it's different from a subtree. A component is an independent subtree
 * @see https://youtu.be/tWVWeAqZ0WU?t=3641
 */
function connectedComponentsCount(graph: AdjacencyList): number {
  let numComponents = 0;
  const visited: Set<IVertex> = new Set();
  const isVisited = (v: IVertex): boolean => visited.has(v);
  const markVisited = (v: IVertex): void => { visited.add(v); }

  // Traverse each unvisited vertex. Mark whatever we reach as visited.
  // If we can't traverse from our starting vertex (to a new unvisited vertex) anymore, increase the count.
  for (const [vertex] of graph) {
    // Traverse and do something, cb (mark each as visited), unless a break condition (visited vertex is found) occurs.
    let foundNewConnectedComponent = false;
    forUntil(graph, vertex, (v) => {
      // For each unvisited vertex
      if (!isVisited(v)) {
        markVisited(v);
        if (!foundNewConnectedComponent) foundNewConnectedComponent = true;
      }
    }, isVisited);
    if (foundNewConnectedComponent) numComponents++;
  }

  return numComponents;
}

// @todo a jest test for connectedComponentsCount
const testAdjList = new Map([[new Vertex('a'), new Set([new Vertex('b')])], [new Vertex('b'), new Set() as Set<IVertex>]]);
// expect(connectedComponentsCount(testAdjList)).toBe(1);
console.log(connectedComponentsCount(testAdjList));