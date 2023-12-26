import Graph from './Graph';

describe('Graph', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
  });

  describe('hasEdge', () => {
    it('should return true if a vertex has at least one edge', () => {
      const vertexA = { value: 'A', children: [] };
      const vertexB = { value: 'B', children: [] };
      const vertexC = { value: 'C', children: [] };

      // Note: Testing depends on addEdge method
      graph.addEdge(vertexA, vertexB);
      graph.addEdge(vertexB, vertexC);

      expect(graph.hasEdge(vertexA)).toBe(true);
      expect(graph.hasEdge(vertexB)).toBe(true);
      expect(graph.hasEdge(vertexC)).toBe(true);
    });

    it('should return false if a vertex has no edges', () => {
      const vertexA = { value: 'A', children: [] };
      const vertexB = { value: 'B', children: [] };

      expect(graph.hasEdge(vertexA)).toBe(false);
      expect(graph.hasEdge(vertexB)).toBe(false);
    });
  });


  describe('addEdge', () => {
    it('should add an edge between two vertices', () => {
      const vertexA = { value: 'A', children: [] };
      const vertexB = { value: 'B', children: [] };

      graph.addEdge(vertexA, vertexB);

      expect(graph.hasEdge(vertexA)).toBe(true);
      expect(graph.hasEdge(vertexB)).toBe(true);
    });
  });

  describe('removeEdge', () => {
    it('should remove an edge between two vertices', () => {
      const vertexA = { value: 'A', children: [] };
      const vertexB = { value: 'B', children: [] };

      graph.addEdge(vertexA, vertexB);
      graph.removeEdge(vertexA, vertexB);

      expect(graph.hasEdge(vertexA)).toBe(false);
      expect(graph.hasEdge(vertexB)).toBe(false);
    });
  });
});
