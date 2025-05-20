// index.js
const readline = require('readline');
const { parseMatrixFile, writeMatrixToFile } = require('./matrix-storage.js');
const { add, subtract, multiply } = require('./operations');

// Setup user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()));
  });
}

async function main() {
  try {
    // Get user input
    const operation = await ask("What operation? (add/subtract/multiply): ");
    const file1 = await ask("First matrix file path: ");
    const file2 = await ask("Second matrix file path: ");
    const outputFile = await ask("Where to save result? ");

    // Load matrices
    const matrix1 = parseMatrixFile(file1);
    const matrix2 = parseMatrixFile(file2);

    // Do the operation
    let result;
    if (operation === 'add') {
      result = add(matrix1, matrix2);
    } else if (operation === 'subtract') {
      result = subtract(matrix1, matrix2);
    } else if (operation === 'multiply') {
      result = multiply(matrix1, matrix2);
    } else {
      throw new Error("Unknown operation");
    }

    // Save result
    writeMatrixToFile(result, outputFile);
    console.log("Done! Result saved to", outputFile);
    
  } catch (error) {
    console.error("Oops! Error:", error.message);
  } finally {
    rl.close();
  }
}

main();
