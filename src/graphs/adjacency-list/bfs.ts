/**
 * There are a few ways to do BFS that should be compared.
 */

import type { AdjacencyList, IVertex } from "../../types/graph-types";


/**
 * Do a bfs by handling each vertex in order.
 * 
 * Uses queue.
 * 
 * @param graph 
 * @param start 
 * @param end 
 * @param cb 
 */
function BFSByVertex(graph: AdjacencyList, start: IVertex, end: IVertex, cb: Function) {
  const queue = [start];

  const visited = new Set();
  const isVisited = (v: IVertex) => visited.has(v);
  const markVisited = (v: IVertex) => visited.add(v);


  while (queue.length) {
    const current = queue.pop(); // Dequeue

    cb(current); // Handle vertex

    // Enqueue children
    const children = graph.get(start)!;
    for (const child of children) {
      queue.push(child);
    }
  }
}


/**
 * BFS by storing the whole row (children that are n edges away from start)
 * 
 * Uses stack and queue.
 * Useful for acyclic graphs. Bc that's just a tree
 * May have 2 entire rows of a graph (and maybe cycles too) in-memory.
 * 
 * @param graph 
 * @param start 
 * @param end 
 * @param cb 
 */
function BFSByRow(graph: AdjacencyList, start: IVertex, end: IVertex, cb: Function) {
  // add

  const visited = new Set();
  const isVisited = (v: IVertex) => visited.has(v);
  const markVisited = (v: IVertex) => visited.add(v);
}


/**
 * A BFS that stores an indicator of the start and end of a row
 * 
 * Uses queue with 2 values: vertex or a row delimeter.
 * Works for shortest path problem.
 */
function BFSByRowDelimeter() {
  const rowsStack = [];

  const visited = new Set();
  const isVisited = (v: IVertex) => visited.has(v);
  const markVisited = (v: IVertex) => visited.add(v);
}