/**
 * # Graph Types
 * @description Reusable types/interfaces for graphs
 * 
 * ## About Graphs: Properties, Constraints, etc.
 *  - Vertexes and edges
 *  - Weight, directedness, cycles,
 *  - Connectedness: Connected (A path exists between every vertex), not connected (there's more than 1 connected component. There are vertices or paths that do not connect. There are disjoint subgraphs).
 * 
 * ### Possible Constraints
 * - Add a **direction** to all edges of the graph
 * - Add an edge **weight**
 * - Disallow **cycles** (edges or paths to the same vertex)
 * - Limit # of connections to each vertex
 * - Have a root vertex (a vertex with paths to all other vertices in the graph)
 * 
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
 * ### More Complex Types (Computed Properties)
 *  - Degree - Number of edges
 *  - Subgraph - A graph that has a subset of another graphs edges
 *  - Path - A sequence of vertices that connect (and have a start and end vertex)
 *  - Connected Component - Maximal connected subgraph (a subgraph that connects to as many components as it can)
 *  - 
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

import { Vertex } from "../graphs/adjacency-list/DAG";


/**
 * A vertex in a graph. Each vertex has a value.
 * And in an adjacency list, each vertex has children.
 */
export interface IVertex {
  value: any;
}


interface IEdge {
  vertices: [IVertex, IVertex];
  weight?: number;
  // directedness?: string;
}

enum EdgeDirection {
  Directed = "DIRECTED",
  Undirected = "UNDIRECTED",
}

// Exactly two vertices with an implicit direction.
interface IDirectedEdge extends IEdge {
  from: IVertex;
  to: IVertex;

  // Include both names? Or just in the implementation?
  // Is there a better name? 
  // start: IVertex;
  // end: IVertex;

  // Implicit or explicit direction or both? Both!
  directedness: EdgeDirection.Directed;
}

interface IUndirectedEdge extends IEdge {
  directedness: EdgeDirection.Undirected;
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
export type DirectedEdgeList = IDirectedEdge[];
export type UndirectedEdgeList = IUndirectedEdge[];
export type EdgeList = UndirectedEdgeList | UndirectedEdgeList;