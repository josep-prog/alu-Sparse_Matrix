// operations.js
const SparseMatrix = require('./sparse-matrix');

function check(a, b, op) {
  if (['add', 'subtract'].includes(op) && (a.rows !== b.rows || a.cols !== b.cols))
    throw new Error("Matrices must have same dimensions.");
  if (op === 'multiply' && a.cols !== b.rows)
    throw new Error("Incompatible dimensions for multiplication.");
}

function addOrSubtract(a, b, isAdd = true) {
  check(a, b, isAdd ? 'add' : 'subtract');
  const result = new SparseMatrix(a.rows, a.cols);

  for (const key in a.data) result.set(...key.split(',').map(Number), a.data[key]);
  for (const key in b.data) {
    const [r, c] = key.split(',').map(Number);
    const delta = isAdd ? b.data[key] : -b.data[key];
    result.set(r, c, result.get(r, c) + delta);
  }

  return result;
}

function multiply(a, b) {
  check(a, b, 'multiply');
  const result = new SparseMatrix(a.rows, b.cols);

  for (const aKey in a.data) {
    const [i, k] = aKey.split(',').map(Number);
    for (let j = 0; j < b.cols; j++) {
      const bVal = b.get(k, j);
      if (bVal !== 0) {
        const val = result.get(i, j) + a.get(i, k) * bVal;
        result.set(i, j, val);
      }
    }
  }

  return result;
}

module.exports = {
  add: (a, b) => addOrSubtract(a, b, true),
  subtract: (a, b) => addOrSubtract(a, b, false),
  multiply
};
