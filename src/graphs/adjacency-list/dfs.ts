/**
 * Recursive and stack implementations of depth-first search
 */

import type { DAG } from './DAG'
import type { IVertex } from "../../types/graph-types";


function dfsRecursive(graph: DAG, start: IVertex, cb: Function) {
  if (graph.isMember(start)) {
    // Do something with the current node
    cb(start);

    // Prioritize going down the graph (child's child infinitely before a sibling)
    for (const child of graph.getChildrenOf(start)!) {
      dfsRecursive(graph, child, cb);
    }
  }
}

function dfsStack(graph: DAG, start: IVertex, cb: Function) {
  if (graph.isMember(start)) {
    const stack = [start]; // start with given node
    while (stack.length) {
      const current = stack.shift()!;
      cb(current);

      // Add children to stack
      for (const child of graph.getChildrenOf(current)!) {
        stack.push(child);
      }
    }
  }
}



export { dfsRecursive, dfsStack }
