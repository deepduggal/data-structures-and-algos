/**
 * Recursive and stack implementations of depth-first search
 */


function dfsRecursive(node, cb) {
  // Do something with the current node
  cb(node);
  // Prioritize going down the graph (child's child infinitely before a sibling)
  for(child of node.children) {
    dfs(child);
  }
}

function dfsStack(node, cb) {
  const stack = [node]; // start with given node
  while(stack.length) {
    cb(stack.unshift());
    
  }
}



export {dfsRecursive, dfsStack}
