import {dfsRecursive, dfsStack} from './dfs';
import * as TestGraphs, {weighted, unweighted, directed, undirected} from './testing/graphs-for-testing';

// Do tests for each dfs implementation
[dfsRecursive, dfsStack].forEach((dfs) => {
  // Test each graph
  for(graphType in TestGraphs) {
    if(graphType === null) continue; // Skip checking unimplemented
    // Test
  }
});
