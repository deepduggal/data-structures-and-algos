import { IVertex } from '../../types/graph-types';
import DAG from './DAG';

/**
 * Adjacency list made of values. Just strings, no vertex. Used for testing.
 */
type TestAdjacencyValues = {
  [key: string]: string[];
};

type TestEdgeListValues = [IVertex, IVertex][];

/**
 * Iterate over an adjacency list (an object with a key and an array of values that only contain other keys of the object)
 */
// const forEachEdge = () => { };

/** Make a DAG graph given values as an object of arrays where the keys are unique values */
const makeDAGFromAdjacencyValues = (testAdjacencyValues: TestAdjacencyValues): DAG => {
  const graph = new DAG();

  // Add edges
  Object.entries(testAdjacencyValues).forEach(([vertex, children]) => {
    children.forEach((childVertex) => graph.addEdge(new Vertex(vertex), new Vertex(childVertex)));
  })

  return graph;
};

const TestAdjacencyValuesToEdgeListOfVertices = (DAG: DAG) => {

};

// Test data
const adjListValues = {
  'A': ['B', 'C'], // one-to-many. connects to 2 edges. connected by 2 edges.
  'B': [''], // one-to-none & many-to-one (B). connects to 0 edges. connected by 3 edges.
  'C': ['A', 'B'], // one-to-one.  connects to 2 edge. connected by 2 edges.
  'D': ['B', 'A']
};

describe('DAG', () => {
  let graph: DAG;

  describe('addEdge', () => {
    it('addEdge', () => {
      const graph = makeDAGFromAdjacencyValues(adjListValues); // Calls addEdge

      expect(graph.numVertices).toBe(3 /* Object.keys(adjListValues).length */);
      expect(graph.countDirectedEdges()).toBe(2);
      // expect(graph.hasEdge()).toBe(true);
      // expect(graph.hasEdge(vertexB)).toBe(true);
    });
  });

  describe('removeEdge', () => {
    it('should remove an edge between two vertices', () => {
      const graph = makeDAGFromAdjacencyValues(adjListValues); // Calls addEdge

      graph.removeEdge('A', 'B');

      expect(graph.numVertices).toBe(3);
      expect(graph.countDirectedEdges()).toBe(2);
      // expect(graph.hasEdge(vertexA, vertexB)).toBe(false);
      // expect(graph.hasEdge(vertexB)).toBe(false);
    });
  });

  // describe('hasEdge', () => {
  //   it('should return true if a vertex has at least one edge', () => {
  //     const vertexA = { value: 'A', children: [] };
  //     const vertexB = { value: 'B', children: [] };
  //     const vertexC = { value: 'C', children: [] };

  //     // Note: Testing depends on addEdge method
  //     graph.addEdge(vertexA, vertexB);
  //     graph.addEdge(vertexB, vertexC);

  //     expect(graph.hasEdge(vertexA)).toBe(true);
  //     expect(graph.hasEdge(vertexB)).toBe(true);
  //     expect(graph.hasEdge(vertexC)).toBe(true);
  //   });

  //   it('should return false if a vertex has no edges', () => {
  //     const vertexA = { value: 'A', children: [] };
  //     const vertexB = { value: 'B', children: [] };

  //     expect(graph.hasEdge(vertexA)).toBe(false);
  //     expect(graph.hasEdge(vertexB)).toBe(false);
  //   });
  // });
});
