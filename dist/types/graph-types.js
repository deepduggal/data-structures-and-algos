"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var EdgeDirection;
(function (EdgeDirection) {
    EdgeDirection["Directed"] = "DIRECTED";
    EdgeDirection["Undirected"] = "UNDIRECTED";
})(EdgeDirection || (EdgeDirection = {}));
//# sourceMappingURL=graph-types.js.map