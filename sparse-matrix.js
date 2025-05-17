// sparse-matrix.js
class SparseMatrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = {}; // key = 'row,col'
  }

  get(r, c) {
    return this.data[`${r},${c}`] || 0;
  }

  set(r, c, val) {
    if (val !== 0) {
      this.data[`${r},${c}`] = val;
    } else {
      delete this.data[`${r},${c}`]; // Keep it truly sparse
    }
  }

  static fromEntries(rows, cols, entries) {
    const mat = new SparseMatrix(rows, cols);
    for (const [r, c, val] of entries) mat.set(r, c, val);
    return mat;
  }
}
module.exports = SparseMatrix;
