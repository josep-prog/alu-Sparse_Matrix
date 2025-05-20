// operations.js
const SparseMatrix = require('./sparse-matrix');

// Check if matrices can work together
function checkSizes(a, b, operation) {
  if (operation === 'add' || operation === 'subtract') {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw new Error("Matrices must be same size for add/subtract");
    }
  }
  if (operation === 'multiply') {
    if (a.cols !== b.rows) {
      throw new Error("Columns of first must match rows of second for multiply");
    }
  }
}

// Add or subtract two matrices
function addMatrices(a, b, doAddition) {
  checkSizes(a, b, doAddition ? 'add' : 'subtract');
  const result = new SparseMatrix(a.rows, a.cols);

  // Copy first matrix to result
  for (const key in a.data) {
    const [row, col] = key.split(',').map(Number);
    result.set(row, col, a.data[key]);
  }

  // Add or subtract second matrix
  for (const key in b.data) {
    const [row, col] = key.split(',').map(Number);
    const value = doAddition ? b.data[key] : -b.data[key];
    result.set(row, col, result.get(row, col) + value);
  }

  return result;
}

// Multiply two matrices
function multiplyMatrices(a, b) {
  checkSizes(a, b, 'multiply');
  const result = new SparseMatrix(a.rows, b.cols);

  for (const aKey in a.data) {
    const [i, k] = aKey.split(',').map(Number);
    const aValue = a.data[aKey];
    
    for (let j = 0; j < b.cols; j++) {
      const bValue = b.get(k, j);
      if (bValue !== 0) {
        result.set(i, j, result.get(i, j) + aValue * bValue);
      }
    }
  }

  return result;
}

module.exports = {
  add: (a, b) => addMatrices(a, b, true),
  subtract: (a, b) => addMatrices(a, b, false),
  multiply: multiplyMatrices
};
