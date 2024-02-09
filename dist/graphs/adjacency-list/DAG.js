"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAG = exports.Vertex = void 0;
class Vertex {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}
exports.Vertex = Vertex;
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
class DAG {
    constructor() {
        this.adjacencyList = new Map();
    }
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
    get numVertices() {
        return this.adjacencyList.size;
    }
    get countDirectedEdges() {
        let edges = 0;
        // Iterate over each vertex
        this.adjacencyList.forEach((children) => {
            edges += children.size;
        });
        return edges;
    }
    getChildrenOf(v) {
        // Return null early
        if (this.isEmpty() || !this.isMember(v))
            return null;
        // Return the children if there is at least 1
        const children = this.adjacencyList.get(v);
        if (children && (children === null || children === void 0 ? void 0 : children.size) > 0) {
            return this.adjacencyList.get(v);
        }
        // Default to null - Member with no children
        return null;
    }
    /**
     * Check if this graph instance has the given vertex as an element.
     * @param v
     */
    isMember(v) {
        return this.adjacencyList.has(v);
    }
    /**
     * Checks if the graph has members
     */
    isEmpty() {
        return this.adjacencyList.size > 0;
    }
    hasChildren(v) {
        if (this.isMember(v)) {
            const children = this.getChildrenOf(v);
            return children.size > 0;
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
    pruneVertex(vertex) {
        if (this.isMember(vertex))
            this.adjacencyList.delete(vertex);
    }
    /**
     * Adds an edge between two vertices.
     * Handles adding new nodes as needed.
     * @todo disallow adding cycles by checking the entire path at time of addition
     */
    addEdge(from, to) {
        // Add the (from) vertex if it doesn't exist as a key
        if (!this.isMember(from)) {
            const neighbors = new Set([to]);
            this.adjacencyList.set(from, neighbors);
        }
        // Or just add the (to) vertex as a neighbor if it's a new edge
        else {
            const neighbors = this.getChildrenOf(from);
            if (!(neighbors === null || neighbors === void 0 ? void 0 : neighbors.has(to)))
                neighbors.add(to);
        }
    }
    /**
     * Removes an edge between two vertices.
     * Calls this.pruneVertices to remove vertices that become hanging (not part of the graph) as part of the edge removal
     * @param from
     * @param to
     */
    removeEdge(from, to) {
        if (this.isMember(from) && this.isMember(to)) {
            // Remove from -> to edge
            const fromsChildren = this.getChildrenOf(from);
            fromsChildren === null || fromsChildren === void 0 ? void 0 : fromsChildren.delete(to); // Removes child if it exists
            // @todo Edge case: Hanging vertex/subgraph - auto-delete or not?
            // - Make sure we didn't remove a bridge. ex. a -> b -> c -> d, if we remove (b -> c), should nodes that don't connect back to the from side be removed?
            // - If to now has no more edges, remove it from the graph
            // Remove to or from if they are now hanging (no edges). Doesn't remove subgraphs and can leave hanging subgraphs.
            [to, from].forEach((vertex) => {
                if (!this.hasEdge(vertex))
                    this.pruneVertex(vertex);
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
    hasEdgeFrom(v) {
        // Just check the children, since this graph is represented as an adjacency list
        // @todo Handle self as a child (edge to self. yes it's a cycle)
        const children = this.getChildrenOf(v);
        if (children && children.size >= 1) {
            return true;
        }
        return false;
    }
    /** Determine if a vertex has at least 1 edge from or to it */
    hasEdge(v) {
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
    hasDirectedPathDFS(from, to) {
        if (this.isMember(from))
            return false; // return early
        // Check for a match (bc from changes to next vertex "down" as we traverse)
        if (from.value === to.value)
            return true; // @todo support object.is too along with primitive equality
        // Continue traversing "downward"
        const children = this.getChildrenOf(from);
        for (const child of children) {
            if (this.hasDirectedPathDFS(child, to))
                return true;
        }
        // No match
        return false;
    }
    /**
     * Determine if there is a path from one vertex to another using BFS.
     * @todo Implement
     */
    hasDirectedPathBFS(from, to) {
        const queue = [from]; // start with from
        // if (this.isMember(from)) return false; // return early
        while (queue.length) {
            // Dequeue a vertex
            const current = queue.shift();
            // Check for match
            if (current.value === to.value)
                return true; // @todo support object.is too along with primitive equality
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
exports.DAG = DAG;
/**
 * Performs a depth-first traversal on a graph until a break condition is met.
 * Do a depth-first traversal. Call cb for every vertex...unless one vertex triggers a break condition, don't pass it to cb, and stop traversal.
 * @param graph The graph (represented as an adjacency list).
 * @param start The starting vertex for the traversal.
 * @param cb The callback function to be called for each visited vertex.
 * @param breakCondition The break condition function that stops the traversal if met. Occurs before cb is called.
 * @returns {boolean} Whether or not the break condition occurred.
 */
const forUntil = (graph, start, cb, breakCondition) => {
    const stack = [start]; // LIFO - last added, out first
    let breakConditionOccurred = false;
    while (stack.length > 0) {
        // Do cb for vertex, unless break condition is met once
        const vertex = stack.pop();
        if (breakCondition && breakCondition(vertex)) {
            breakConditionOccurred = true;
            break;
        }
        cb(vertex);
        // Add children to stack - to handle them later
        const children = graph.get(start); // @todo remove !
        for (const child of children) {
            stack.push(child);
        }
    }
    return false;
};
/**
 * Count the number of connected components in an undirected graph (represented as an adjacency list).

 * @returns The number of connected components in the graph.
 *
 * ## About Connected Components
 * A connected component is also called a component. It's really the largest non-overlapping top-level subtree, so it's different from a subtree. A component is an independent subtree
 * @see https://youtu.be/tWVWeAqZ0WU?t=3641
 */
function connectedComponentsCount(graph) {
    let count = 0;
    const visited = new Set();
    const isVisited = (v) => visited.has(v);
    const markVisited = (v) => { visited.add(v); };
    // Traverse each unvisited vertex. Mark whatever we reach as visited.
    // If we can't traverse from our starting vertex (to a new unvisited vertex) anymore, increase the count.
    for (const [vertex] of graph) {
        // Traverse and do something, cb (mark each as visited), unless a break condition (visited vertex is found) occurs.
        let foundConnectedComponent = false;
        forUntil(graph, vertex, (v) => {
            // For each unvisited vertex
            if (!isVisited(v)) {
                markVisited(v);
                if (!foundConnectedComponent)
                    foundConnectedComponent = true;
            }
        }, isVisited);
        if (foundConnectedComponent)
            count++;
    }
    return count;
}
// // @todo a jest test for connectedComponentsCount
// const testAdjList = new Map([[new Vertex('a'), new Set([new Vertex('b')])], [new Vertex('b'), new Set() as Set<IVertex>]]);
// // expect(connectedComponentsCount(testAdjList)).toBe(1);
// console.log(connectedComponentsCount(testAdjList));
/**
 * Returns the size of the largest component
 * @returns The size of the largest component
 */
function largestComponentSize(graph) {
    let largestSize = 0;
    const visited = new Set();
    const isVisited = (v) => visited.has(v);
    const markVisited = (v) => { visited.add(v); };
    // Traverse each unvisited vertex. Mark whatever we reach as visited.
    // If we can't traverse from our starting vertex (to a new unvisited vertex) anymore, increase the count.
    for (const [vertex] of graph) {
        // Traverse and do something, cb (mark each as visited), unless a break condition (visited vertex is found) occurs.
        let componentSize = 0;
        forUntil(graph, vertex, (v) => {
            // For each unvisited vertex
            if (!isVisited(v)) {
                markVisited(v);
                componentSize++;
            }
        }, isVisited);
        if (componentSize > largestSize)
            largestSize = componentSize;
    }
    return largestSize;
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
//# sourceMappingURL=DAG.js.map