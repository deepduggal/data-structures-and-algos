"use strict";
/**
 * Recursive and stack implementations of depth-first search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfsStack = exports.dfsRecursive = void 0;
function dfsRecursive(graph, start, cb) {
    if (graph.isMember(start)) {
        // Do something with the current node
        cb(start);
        // Prioritize going down the graph (child's child infinitely before a sibling)
        for (const child of graph.getChildrenOf(start)) {
            dfsRecursive(graph, child, cb);
        }
    }
}
exports.dfsRecursive = dfsRecursive;
function dfsStack(graph, start, cb) {
    if (graph.isMember(start)) {
        const stack = [start]; // start with given node
        while (stack.length) {
            const current = stack.shift();
            cb(current);
            // Add children to stack
            for (const child of graph.getChildrenOf(current)) {
                stack.push(child);
            }
        }
    }
}
exports.dfsStack = dfsStack;
//# sourceMappingURL=dfs.js.map