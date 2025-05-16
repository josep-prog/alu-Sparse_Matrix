class SparseMatrix {
  constructor(rows, cols) {
    this.rows = rows || 0;  // Allow undefined dimensions
    this.cols = cols || 0;
    this.data = {}; // Simple object storage: {"row,col": value}
  }

  // Set value at position (row, col)
  set(row, col, value) {
    // Update matrix dimensions if needed
    if (row >= this.rows) this.rows = row + 1;
    if (col >= this.cols) this.cols = col + 1;

    const key = `${row},${col}`;
    
    if (value !== 0) {
      this.data[key] = value;
    } else {
      // Remove the key if setting to zero
      if (this.data.hasOwnProperty(key)) {
        delete this.data[key];
      }
    }
  }

  // Get value at position (row, col)
  get(row, col) {
    if (row >= this.rows || col >= this.cols) {
      return 0; // Return 0 for positions outside current dimensions
    }
    return this.data[`${row},${col}`] || 0;
  }

  // Create from a 2D array (for testing)
  static fromArray(arr) {
    if (!arr.length) return new SparseMatrix(0, 0);
    
    const rows = arr.length;
    const cols = arr[0].length;
    const matrix = new SparseMatrix(rows, cols);
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (arr[i][j] !== 0) {
          matrix.set(i, j, arr[i][j]);
        }
      }
    }
    return matrix;
  }

  // Convert to dense array (for display)
  toArray() {
    const result = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(this.get(i, j));
      }
      result.push(row);
    }
    return result;
  }
}

module.exports = SparseMatrix;
