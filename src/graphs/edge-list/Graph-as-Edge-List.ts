import { Vertex } from '../adjacency-list/DAG';
import type { IVertex, UndirectedEdgeList, AdjacencyList } from '../../types/graph-types.js';

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
  edgeList.forEach((edge) => {
    const [a, b] = edge.vertices;
    // Add vertices with children
    if (!adjList.has(a)) adjList.set(a, []);
    if (!adjList.has(b)) adjList.set(b, []);
    // Add children - set enforces uniqueness
    adjList.set(a, adjList!.get(a).push(b));
    adjList.set(b, adjList!.get(b).push(a));
  });
  return adjList;
}

/**************************
 * Path & Metadata Methods
 * A lot of graph work is calculating meta data. Paths are meta data.
 * Graphs can be huge! Like Google Maps or the map of my area.
 * 
 * Real world-graph practice includes calculating the shorter of 
 **************************/

/**
 * Checks if an undirected edge list has a path
 * @param graph
 * @returns {boolean}
 * @see https://youtu.be/tWVWeAqZ0WU?t=2526
 */
function hasUndirectedPath(graph: UndirectedEdgeList, start: IVertex, end: IVertex): boolean {

  // Convert to adjacency list bc better for traversal
  const adjList = edgeListToAdjList(graph);
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
 * find the shortest path between two vertices.
 * Works for unweighted and weighted graph.
 * Shortest Path Definition: Fewest number of edges
 * 
 * @param graph 
 * @param start 
 * @param end
 * @returns -1 if no path exists. Otherwise, returns path size (num edges)  
*/
function shortestPathSizeByNumEdges(graph: UndirectedEdgeList, start: IVertex, end: IVertex) {
  let pathSize = 0; // is shortest path size bc bfs
  const adjList = edgeListToAdjList(graph);

  if (adjList.has(start)) {
    // @todo ensure end is in the graph before traversing

    // find start. from start, find end
    // just do a breadth-first search, since shortest path means number of edges long (which is the same as number of edges deep)! bfs will find the least-deep vertex.

    // We'll queue entire sets of children.
    // We can handle start seperately since there's an edge case we need to handle.
    const stack: IVertex[][] = []; // @todo handle start differently bc sets of children.
    const visited = new Set();
    const isVisited = (v: IVertex) => visited.has(v);
    const markVisited = (v: IVertex) => visited.add(v);
    /**
     * Do something with an unvisited vertex
     */
    const visit = (v: IVertex) => {
      if (isEndOfPath(v)) return pathSize;
      markVisited(v);
    };

    /**
     * Check if a vertex is the end vertex
     */
    const isEndOfPath = (v: IVertex) => {
      return v === end;
    };

    // Add start as sole member of first row
    if (adjList.has(start)) {
      stack.unshift([start]);
    }

    // Get the next row
    while (stack.length) {
      const currentRow = stack.shift()!; // A set of children. A row of the traversal tree

      // Handle set of children
      // We've gone down in depth in the graph traversal
      pathSize++; // Increment path size when depth increases


      if (currentRow.length) {
        const nextRow = [];
        // Iterate over each vertex in the row
        for (const child of currentRow) {
          if (!isVisited(child)) {
            visit(child);

            // @todo Add children to stack
            for (const childofChild of adjList.get(child)!) {
              nextRow.push(childofChild);
            }
          }
        }
        // Add nextRow to stack
        stack.unshift();
      }

      // @todo old way
      // Dequeue and handle 1 current node
      if (!isVisited(currentRow)) {
        visit(currentRow);


        // Enqueue children of current (as a set of children, so we know when we're going "down" more)
        const children = adjList.get(currentRow)!; // It's literally a Set already.
        stack.push(children);

        // Before enqueuing children, add to stack. After dequeueing first


        // Enqueue children of current as vertices
        for (const child of children) {
          // @todo skip adding visited children to queue for less memory usage
          stack.push(child);
        }
      }
      // else {continue;} // skip visited
    }

    // path not found
    return -1;
  }
}

/**
 * find the shortest path between two vertices in a weighted graph
 * Shortest Path Definition: path with smallest cumulative weight (by adding edge weights)
 * 
 * @param graph 
 * @param start 
 * @param end 
 */
function shortestPathSizeByWeights(graph: UndirectedEdgeList, start: IVertex, end: IVertex) {
  // @todo ensure that start and end are in the graph
}

/**
 * Calculate the shortest path between three vertices
 * @param graph 
 * @param a 
 * @param b 
 * @param c 
 */
function shortestThreePathSize(graph, a: IVertex, b: IVertex, c: IVertex) {

}

/**
 * NOTE: PROBABLY A HARD PROBLEM FOR NOW
 * Calculate the shortest path between three vertices
 * @param graph
 * @param vertices An ordered list of vertices. vertices[0] is the starting vertex, vertices[1] is an intermediate vertex, 
 */
function shortestNPathSize(graph, vertices: Iterable<IVertex>) {
  for (const vertex of vertices) {
    // Perform operations on each vertex

  }
}

/**
 * Get the path or collection of paths) with the shortest size.
 * Extra: Wrap in an object and include a .getAny() and .length() method
 */
function getShortestPaths() {

}



function getPathSizeByWeight() {

}

function getPath(graph, a: IVertex, b: IVertex) {

}

/**
 * The number of unique paths in a graph
 */
function countAllPaths() {

}

/**
 * Calculates all paths in a graph.
 * Stored as LinkedLists for easy traversal?
 * Or do I just make an adjacency list (stores what each vertex directly connect to, aka all 1-edge paths)?
 * Or should I store what each path starts with and ends with (assuming it has a start or end)?
 * 
 * And how do I store sub paths of paths? Is this a trie?
 * What about cycles?! What if all paths are infinite? 
 */
function getAllPaths() {

}

/**
 * Precalculating all path sizes
 * There will be 2 path sizes: by number of edges, by edge weights.
 * We can also calculate the shortest path between all two vertices.
 * 
 * Real-world, big graphs: Could be done conurrently, in advance, so the precalculation may not exist and we fallback to the method above.
 * 
 * @param edgeList 
 * @param start 
 * @param end 
 */
function calculateAllPathSizes(edgeList: UndirectedEdgeList, start: IVertex, end: IVertex) {
  // @todo ensure that start and end are in the graph

  // find start
  // Find all paths. Store all paths?
  // from start, find end

  // Optimization - Check if subpath is stored
}

/**
 * Calculate the shortest path(s) from any vertex to any vertex. Returns multiple paths if there were multiple paths of the same size.
 */
function calculateAllShortestPaths() {

}

/**
 * Determines which vertices and edges are affected if a path is changed. Useful for updating graph metadata like paths.
 *
 * Situations where the path changes:
 * - add new vertex that didn't exist before
 * - remove existing vertex, edge weight changed)
 */

// -------------------------------
/** A directed, weighted edge */
// class DirectedWeightedEdge implements IDirectedWeightedEdge {
//   vertices: [IVertex, IVertex];
//   weight: number;

//   constructor(fromValue: IVertex, toValue: IVertex, weight: number = 0) {
//     this.vertices = [fromValue, toValue];
//     this.weight = weight;
//     // @todo non-implicit direction or startingVertex
//   }

//   /** Get the starting vertex */
//   get from() {
//     return this.vertices[0];
//   }

//   /** Get the ending vertex */
//   get to() {
//     return this.vertices[1];
//   }
// }

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