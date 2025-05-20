const fs = require('fs');
const SparseMatrix = require('./sparse-matrix');

// Read matrix from file
function parseMatrixFile(filePath) {
  // Read file and clean up lines
  const lines = fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Get rows and cols from first two lines
  const rows = parseInt(lines[0].split('=')[1]);
  const cols = parseInt(lines[1].split('=')[1]);

  // Process each matrix entry
  const entries = [];
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('(') || !line.endsWith(')')) {
      throw new Error("Bad format: entries must be in (row,col,value) format");
    }
    
    // Remove parentheses and split values
    const values = line.slice(1, -1).split(',').map(v => parseFloat(v.trim()));
    if (values.length !== 3) {
      throw new Error("Bad format: each entry needs row,col,value");
    }
    entries.push(values);
  }

  return SparseMatrix.fromEntries(rows, cols, entries);
}

// Save matrix to file
function writeMatrixToFile(matrix, filePath) {
  let output = [`rows=${matrix.rows}`, `cols=${matrix.cols}`];
  
  // Add each matrix entry
  for (const key in matrix.data) {
    output.push(`(${key},${matrix.data[key]})`);
  }
  
  fs.writeFileSync(filePath, output.join('\n'));
}

module.exports = { parseMatrixFile, writeMatrixToFile };
