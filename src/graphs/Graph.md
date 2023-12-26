# Graph

## Description
A **graph** is a **non-linear** data structure that consists of a set of **vertices** (nodes) and a set of **edges** that connect these vertices. It is used to represent relationships between objects. Edges may optionally have a **weight** -  a value associated with the edge.

**Vertex Properties**: Value

**Edge Properties**: Direction (Directed/Undirected), Weight (Weighted/Unweighted)


**Cycles**: Cyclic/Acyclic

**Paths/Routes**: Connected/Disconnected/Complete

**Branches**: Sparse/Dense

**Connected Componnents**

## Types of Graphs
Graphs can be classified into different types based on their properties:

| Graph Terminology | Description |
|-------------------|-------------|
| Undirected Graph | A graph in which edges have no direction. The edges between nodes are bidirectional. |
| Directed Graph (Digraph) | A graph in which edges have a direction. The edges between nodes are unidirectional. |
| Weighted Graph | A graph in which each edge is assigned a weight or cost. These weights can represent distances, costs, or any other relevant metric. |
| Unweighted Graph | A graph in which each edge does not have a weight or cost associated with it. The edges are considered to have equal importance or distance. |
| Cyclic Graph | A graph that contains at least one cycle, which is a path that starts and ends at the same node. |
| Acyclic Graph | A graph that does not contain any cycles. |
| Connected Graph | A graph in which there is a path between every pair of nodes. |
| Disconnected Graph | A graph in which there are one or more pairs of nodes that are not connected by any path. |
| Complete Graph | A graph in which there is an edge between every pair of distinct nodes. |
| Sparse Graph | A graph with relatively few edges compared to the maximum number of edges possible. |
| Dense Graph | A graph with a large number of edges compared to the maximum number of edges possible. |


## Common Implementations

| Graph Representation | Description |
|----------------------|-------------|
| Adjacency List       | An adjacency list represents a graph as an array of linked lists. Each element in the array represents a vertex in the graph. The linked list associated with each vertex contains the vertices that are adjacent to it. |
| Adjacency Matrix     | An adjacency matrix represents a graph as a 2D matrix. The rows and columns of the matrix represent the vertices in the graph. The value at matrix[i][j] indicates whether there is an edge between vertex i and vertex j. |
| Edge List            | An edge list represents a graph as a list of edges. Each edge is represented by a pair of vertices (u, v), indicating that there is an edge between vertex u and vertex v. |


## Common Graph Algorithms

| Algorithm                | Description                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| Breadth-First Search (BFS)   | Traverses a graph in a breadthward motion, exploring all vertices at the same level before moving to the next level. |
| Depth-First Search (DFS)     | Traverses a graph in a depthward motion, exploring as far as possible along each branch before backtracking.        |
| Dijkstra's Algorithm         | Finds the shortest path between two nodes in a weighted graph.                                                      |
| Bellman-Ford Algorithm       | Finds the shortest path between two nodes in a weighted graph, even if the graph contains negative-weight edges.     |
| Prim's Algorithm             | Finds the minimum spanning tree of a connected, undirected graph.                                                   |
| Kruskal's Algorithm          | Finds the minimum spanning tree of a connected, undirected graph by repeatedly adding the smallest edge that does not form a cycle. |
| Topological Sorting          | Orders the vertices of a directed acyclic graph (DAG) in such a way that for every directed edge (u, v), vertex u comes before vertex v. |
| Floyd-Warshall Algorithm     | Finds the shortest path between all pairs of vertices in a weighted graph.                                          |
| Tarjan's Algorithm           | Finds strongly connected components in a directed graph.                                                            |


## API
A graph data structure's API typically includes the following methods:


| Method         | Description                                      |
|----------------|--------------------------------------------------|
| Add Node       | Adds a new node to the graph.                     |
| Add Edge       | Adds an edge between two nodes in the graph.      |
| Remove Node    | Removes a node from the graph.                    |
| Remove Edge    | Removes an edge between two nodes in the graph.   |
| Find Node (DFS)     | Finds a node in the graph.                        |
| Find Node  (BFS)    | Finds a node in the graph.                        |
| Get Neighbors  | Returns the neighbors of a given node.            |
| Get Nodes      | Returns all nodes in the graph.                   |
| Get Edges      | Returns all edges in the graph.                   |


## API Pseudocode

### Graph Class

1. Create a class called Graph.
2. Initialize an empty dictionary to store the graph's vertices and their corresponding edges.

### Add Node Method

1. Create a method called addNode that takes a parameter node.
2. Add the node to the graph's dictionary as a key with an empty list as its value.

### Add Edge Method

1. Create a method called addEdge that takes two parameters, node1 and node2.
2. Check if both node1 and node2 exist in the graph's dictionary.
3. If they do, append node2 to the list of edges for node1, and vice versa.

### Remove Node Method

1. Create a method called removeNode that takes a parameter node.
2. Check if the node exists in the graph's dictionary.
3. If it does, remove the node from the dictionary and remove all edges connected to it.

### Remove Edge Method

1. Create a method called removeEdge that takes two parameters, node1 and node2.
2. Check if both node1 and node2 exist in the graph's dictionary.
3. If they do, remove node2 from the list of edges for node1, and vice versa.

### Find Node (DFS) Method

1. Create a method called findNode that takes a parameter node.
2. Check if the node exists in the graph's dictionary.
3. If it does, return the node.

### Find Node (BFS) Method

1. Create a method called findNode that takes a parameter node.
2. Check if the node exists in the graph's dictionary.
3. If it does, return the node.

### Get Neighbors Method

1. Create a method called getNeighbors that takes a parameter node.
2. Check if the node exists in the graph's dictionary.
3. If it does, return the list of edges connected to the node.

### Get Nodes Method

1. Create a method called getNodes.
2. Return all the nodes in the graph's dictionary.

### Get Edges Method

1. Create a method called getEdges.
2. Return all the edges in the graph's dictionary.

### Size

1. Set count variable;
2. Traverse the graph, 
3. Return the number of nodes in the entire graph

## Resources

- [Graph Theory - Graph Representation (Adjacency List, Adjacency Matrix, Edge List)](https://www.youtube.com/watch?v=tWVWeAqZ0WU&list=PL9FbdTUwiaK9RqfUz42_tCTl6lIeFerJx&index=3)
