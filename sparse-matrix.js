// sparse-matrix.js
class SparseMatrix {
  constructor(rows, cols) {
    this.rows = rows; // Number of rows
    this.cols = cols; // Number of columns
    this.data = {};   // Stores non-zero values as 'row,col': value
  }

  // Get value at row, col (0 if not set)
  get(row, col) {
    const key = `${row},${col}`;
    return this.data[key] || 0;
  }

  // Set value at row, col (only stores if not zero)
  set(row, col, value) {
    const key = `${row},${col}`;
    if (value !== 0) {
      this.data[key] = value;
    } else {
      delete this.data[key]; // Remove zero values
    }
  }

  // Create matrix from list of [row,col,value] entries
  static fromEntries(rows, cols, entries) {
    const matrix = new SparseMatrix(rows, cols);
    for (const [row, col, value] of entries) {
      matrix.set(row, col, value);
    }
    return matrix;
  }
}

module.exports = SparseMatrix;
