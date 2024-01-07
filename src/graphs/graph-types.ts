/**
 * @description Reusable types/interfaces for graphs
 * 
 * ## Contents:
 * ### Basic Types
 *  - Vertex
 *  - Edge
 *    - Directed, Weighted
 *    - Directed, Unweighted
 *    - Undirected, Weighted
 *    - Undirected, Unweighted
 * 
 * ### More Complex Types
 *  - Subgraph - A graph that has a subset of another graphs edges
 *  - Path - A rooted, continuous
 *  - Component
 * 
 * ### Data Representations (in terms of basic types)
 *  - Edge List
 *  - Adjacency List
 *  - Adjacency Matrix
 * 
 * 
 * ### Special Graphs
 * - Rooted Graphs
 *  - Trees
 *    - BST
 *    - Trie (Radix Tree?)
 * 
 * ### Real-World Situations
 * - De-duplication - enforcing uniqueness of subtrees
 * - Memory, references instead of copies
 * - Copying a subgraph
 */

import { Vertex } from "./adjacency-list/DAG";


/**
 * A vertex in a graph. Each vertex has a value.
 * And in an adjacency list, each vertex has children.
 */
export interface IVertex {
  value: any;
}


interface IEdge {
  vertices: [Vertex, Vertex];
  weight?: number;
}

// Exactly two vertices with an implicit direction.
interface IDirectedEdge extends IEdge {
  // directedness: EdgeDirection;
}

interface IUndirectedEdge extends IEdge {
  // directedness: EdgeDirection;
}

export interface IDirectedUnweightedEdge extends IDirectedEdge {

}

export interface IDirectedWeightedEdge extends IDirectedEdge {
  weight: number;
}

export interface IUndirectedUnweightedEdge extends IUndirectedEdge {

}

export interface IUndirectedWeightedEdge extends IUndirectedEdge {
  weight: number;
}

/** A map of single vertices to their children.
 * Remember children are not neighbors (neighbor's in one direction).
 * Not best choice for undirected graph, since implementation includes direction. @todo Implement an undirected adjacency list (for less memory and faster traversal and deletion). */
export type AdjacencyList = Map<IVertex, Set<IVertex>>;

/**
 * A collection of unique, directed edges.
 */
type DirectedEdgeList = IDirectedEdge[];
export type UndirectedEdgeList = [IVertex, IVertex][];
type EdgeList = UndirectedEdgeList;