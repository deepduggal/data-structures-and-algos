"use strict";
// import type { IVertex, AdjacencyMatrix } from '../../types/graph-types';
/**
 * Island Problem:
 *
 * There's a grid (2d matrix or array) that represents land or water.
 * An island is a set of land that touches (including diagonally).
 *
 * @example
 * const grid = [
 *  ['W', 'L', 'W', 'W', 'W'],
 *  ['W', 'L', 'W', 'W', 'W'],
 *  ['W', 'W', 'W', 'L', 'W'],
 *  ['W', 'W', 'L', 'L', 'W'],
 *  ['L', 'W', 'W', 'L', 'L'],
 *  ['L', 'L', 'W', 'W', 'W']
 * ];
 */
const testGrid = [
    /*        | c0 - c1 - c2 - c3 - c4 | */
    /* | r0 */ ['W', 'L', 'W', 'W', 'W'],
    /* | r1 */ ['W', 'L', 'W', 'W', 'W'],
    /* | r2 */ ['W', 'W', 'W', 'L', 'W'],
    /* | r3 */ ['W', 'W', 'L', 'L', 'W'],
    /* | r4 */ ['L', 'W', 'W', 'L', 'L'],
    /* | r5 */ ['L', 'L', 'W', 'W', 'W']
];
const isLand = (val) => val === 'L';
/**
 * Count the number of islands in a grid
 * @param grid
 */
function islandCount(grid) {
    let count = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visitedLocations = new Array(grid.length); // m * n size array, start with all unvisited
    // Fill visitedLocations with rows/arrays of false (making it a 2d array)
    for (let i = 0; i < numRows; i++) {
        const subArray = new Array(numCols).fill(false);
        visitedLocations[i] = subArray;
    }
    const markVisited = (row, col) => {
        visitedLocations[row][col] = true;
    };
    const isVisited = (row, col) => {
        return visitedLocations[row][col];
    };
    const rMin = 0, rMax = grid.length - 1;
    for (let r = 0; r < grid.length; r++) {
        const row = grid[r];
        const cMin = 0, cMax = row.length - 1;
        for (let c = 0; c < row.length; c++) {
            const gridItem = row[c];
            /**
             * Get horizontally and vertically adjacent neighbors of the grid item at row r and column c, if any exists.
             * Would return an empty array if
             *
             */
            function getAdjacentLocations(r, c, rMin, rMax, cMin, cMax) {
                const neighbors = [];
                // above
                if (r - 1 >= rMin) {
                    neighbors.push([r - 1, c]);
                }
                // below
                if (r + 1 <= rMax) {
                    neighbors.push([r + 1, c]);
                }
                // to-left
                if (c - 1 >= cMin) {
                    neighbors.push([r, c - 1]);
                }
                // to-right
                if (c + 1 <= cMax) {
                    neighbors.push([r, c + 1]);
                }
                if (!neighbors.length) {
                    throw RangeError('The given row and/or column is not valid for this grid');
                }
                return neighbors;
            }
            // Found new island
            if (isLand(gridItem) && !isVisited(r, c)) {
                // Start new island/connected component
                count++; // Increase island count
                // Find and visit connected component members
                const locQueue = [[r, c]]; // enqueue the grid item's location in the location queue
                while (locQueue.length) {
                    // Visit (in this case just mark as visited)
                    const [r, c] = locQueue.shift();
                    markVisited(r, c);
                    // For each neighbor that is unvisited land, enqueue for a future visit
                    getAdjacentLocations(r, c, rMin, rMax, cMin, cMax).forEach(([row, col]) => {
                        const neighbor = grid[row][col];
                        if (isLand(neighbor) && !isVisited(row, col)) {
                            // queue the location
                            locQueue.push([row, col]); // @todo adjust for queue data type
                        }
                    });
                }
            }
        }
    }
    return count;
}
// console.log('islandCount: ', islandCount(testGrid));
/**
 * Find the size of the smallest island in a grid
 */
function minIslandSize(grid) {
    let minIsland = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visitedLocations = [];
    for (let i = 0; i < numRows; i++) {
        visitedLocations[i] = new Array(numCols).fill(false);
    }
    const isVisited = (r, c) => visitedLocations[r][c] === true;
    const markVisited = (r, c) => visitedLocations[r][c] = true;
    const visit = (r, c) => {
        const gridItem = grid[r][c];
        if (isLand(gridItem) && !isVisited(r, c)) {
            markVisited(r, c);
        }
    };
    const visitIsland = (r, c) => {
    };
    const visitConnectedLand = (r, c, islandSize) => {
        return islandSize + 1;
    };
    // Check neighbors: above, below, to left, and to right. Must be within range.
    const getNeighborLocations = (r, c, rowMax, colMax, rowMin = 0, colMin = 0) => {
        const neighbors = [];
        // above
        if (r - 1 >= rowMin) {
            neighbors.push([r - 1, c]);
        }
        // below
        if (r + 1 <= rowMax) {
            neighbors.push([r + 1, c]);
        }
        // to left
        if (c - 1 >= colMin) {
            neighbors.push([r, c - 1]);
        }
        // to right
        if (c + 1 <= colMax) {
            neighbors.push([r, c + 1]);
        }
        return neighbors;
    };
    const rMax = grid.length - 1;
    for (let r = 0; r < grid.length; r++) {
        const cMax = grid[r].length - 1;
        for (let c = 0; c < grid[r].length; c++) {
            const gridItem = grid[r][c]; // @todo
            if (isLand(gridItem) && !isVisited(r, c)) {
                // Found start of new island
                let islandSize = 0;
                const locStack = [[r, c]];
                while (locStack.length) {
                    const [currentRow, currentCol] = locStack.pop(); // Remove newest added from stack
                    markVisited(currentRow, currentCol);
                    islandSize++;
                    // Add neighbor locations to stack (DFS)
                    const neighborLocations = getNeighborLocations(currentRow, currentCol, rMax, cMax);
                    neighborLocations.forEach(([neighborRow, neighborCol]) => {
                        const currentNeighbor = grid[neighborRow][neighborCol];
                        if (isLand(currentNeighbor) && !isVisited(neighborRow, neighborCol)) {
                            locStack.push([neighborRow, neighborCol]); // Add to top of stack
                        }
                    });
                }
                // Update minIsland if necessary
                if (islandSize > 0 && minIsland === 0 || islandSize < minIsland) {
                    minIsland = islandSize;
                }
            }
        }
    }
    return minIsland;
}
console.log(minIslandSize(testGrid));
//# sourceMappingURL=GraphProblems.js.map