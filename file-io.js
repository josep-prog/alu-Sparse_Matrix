// file-io.js
const fs = require('fs');
const SparseMatrix = require('./sparse-matrix');

function parseMatrixFile(filePath) {
  const lines = fs.readFileSync(filePath, 'utf-8')
    .split('\n').map(l => l.trim()).filter(Boolean);

  const getValue = (line) => parseInt(line.split('=')[1]);
  const rows = getValue(lines[0]);
  const cols = getValue(lines[1]);

  const entries = lines.slice(2).map(line => {
    if (!line.startsWith('(') || !line.endsWith(')')) {
      throw new Error("Input file has wrong format");
    }
    const parts = line.slice(1, -1).split(',').map(p => parseFloat(p.trim()));
    if (parts.length !== 3 || parts.some(isNaN)) {
      throw new Error("Input file has wrong format");
    }
    return parts;
  });

  return SparseMatrix.fromEntries(rows, cols, entries);
}

function writeMatrixToFile(matrix, filePath) {
  const lines = [`rows=${matrix.rows}`, `cols=${matrix.cols}`];
  for (const key in matrix.data) {
    lines.push(`(${key}, ${matrix.data[key]})`);
  }
  fs.writeFileSync(filePath, lines.join('\n'));
}

module.exports = { parseMatrixFile, writeMatrixToFile };
