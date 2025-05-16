const fs = require('fs');
const SparseMatrix = require('./sparse-matrix');

function parseMatrixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split into lines and clean each line
  const lines = content.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Parse dimensions from headers
  let rows = 0;
  let cols = 0;
  
  // Check for dimension headers
  while (lines.length > 0 && (lines[0].startsWith('rows=') || lines[0].startsWith('cols='))) {
    const header = lines.shift();
    if (header.startsWith('rows=')) {
      rows = parseInt(header.split('=')[1]);
    } else {
      cols = parseInt(header.split('=')[1]);
    }
  }

  const matrix = new SparseMatrix(rows, cols);
  let maxRow = 0;
  let maxCol = 0;

  for (const line of lines) {
    // Remove all whitespace between elements
    const cleanLine = line.replace(/\s+/g, '');
    
    // Check basic format
    if (!cleanLine.startsWith('(') || !cleanLine.endsWith(')')) {
      throw new Error(`Input file has wrong format in line: ${line}`);
    }
    
    // Extract values between parentheses
    const values = cleanLine.slice(1, -1).split(',');
    if (values.length !== 3) {
      throw new Error(`Input file has wrong format in line: ${line} - expected 3 values`);
    }
    
    // Parse values
    const row = parseInt(values[0]);
    const col = parseInt(values[1]);
    const value = parseFloat(values[2]);
    
    // Validate numbers
    if (isNaN(row) || isNaN(col) || isNaN(value)) {
      throw new Error(`Non-numeric value in line: ${line}`);
    }
    
    // Update matrix dimensions from data
    if (row > maxRow) maxRow = row;
    if (col > maxCol) maxCol = col;
    
    // Add to sparse matrix
    matrix.set(row, col, value);
  }

  // Ensure matrix covers all entries
  matrix.rows = Math.max(matrix.rows, maxRow + 1);
  matrix.cols = Math.max(matrix.cols, maxCol + 1);
  
  return matrix;
}

function writeMatrixToFile(matrix, filePath) {
  let output = '';
  
  // Write dimension headers
  output += `rows=${matrix.rows}\n`;
  output += `cols=${matrix.cols}\n`;
  
  // Collect all non-zero entries
  const entries = [];
  for (const key in matrix.data) {
    const [row, col] = key.split(',').map(Number);
    entries.push(`(${row}, ${col}, ${matrix.data[key]})`);
  }
  
  // Write entries
  output += entries.join('\n');
  fs.writeFileSync(filePath, output);
}

module.exports = { parseMatrixFile, writeMatrixToFile };
