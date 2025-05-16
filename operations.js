const SparseMatrix = require('./sparse-matrix');

function checkDimensions(a, b, operation) {
  console.log(`Matrix A: ${a.rows} rows × ${a.cols} cols`);
  console.log(`Matrix B: ${b.rows} rows × ${b.cols} cols`);

  if (operation === 'add' || operation === 'subtract') {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      throw new Error(
        `Matrix dimensions don't match for ${operation}: ` +
        `${a.rows}x${a.cols} vs ${b.rows}x${b.cols}`
      );
    }
  } else if (operation === 'multiply') {
    if (a.cols !== b.rows) {
      throw new Error(
        `Matrix dimensions incompatible for multiplication: ` +
        `A cols (${a.cols}) must equal B rows (${b.rows})`
      );
    }
  }
}

function add(a, b) {
  checkDimensions(a, b, 'add');
  const result = new SparseMatrix(a.rows, a.cols);
  
  // Add all elements from a
  for (const key in a.data) {
    result.set(...key.split(',').map(Number), a.data[key]);
  }
  
  // Add all elements from b
  for (const key in b.data) {
    const [row, col] = key.split(',').map(Number);
    result.set(row, col, result.get(row, col) + b.data[key]);
  }
  
  return result;
}

function subtract(a, b) {
  checkDimensions(a, b, 'subtract');
  const result = new SparseMatrix(a.rows, a.cols);
  
  // Add all elements from a
  for (const key in a.data) {
    result.set(...key.split(',').map(Number), a.data[key]);
  }
  
  // Subtract all elements from b
  for (const key in b.data) {
    const [row, col] = key.split(',').map(Number);
    result.set(row, col, result.get(row, col) - b.data[key]);
  }
  
  return result;
}

function multiply(a, b) {
  checkDimensions(a, b, 'multiply');
  const result = new SparseMatrix(a.rows, b.cols);
  
  // For each non-zero in a
  for (const aKey in a.data) {
    const [i, k] = aKey.split(',').map(Number);
    const aVal = a.data[aKey];
    
    // For each non-zero in b where column matches row
    for (const bKey in b.data) {
      const [k2, j] = bKey.split(',').map(Number);
      if (k === k2) {
        result.set(i, j, result.get(i, j) + aVal * b.data[bKey]);
      }
    }
  }
  
  return result;
}

module.exports = { add, subtract, multiply };
