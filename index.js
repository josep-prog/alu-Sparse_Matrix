const readline = require('readline');
const { add, subtract, multiply } = require('./operations');
const { parseMatrixFile, writeMatrixToFile } = require('./file-io');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\nSparse Matrix Calculator');
  console.log('1. Add matrices');
  console.log('2. Subtract matrices');
  console.log('3. Multiply matrices');
  console.log('4. Exit');
}

function getInput(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  let running = true;
  
  while (running) {
    showMenu();
    const choice = await getInput('Select an operation (1-4): ');
    
    try {
      switch (choice) {
        case '1':
        case '2':
        case '3':
          const file1 = await getInput('Enter first matrix file path: ');
          const file2 = await getInput('Enter second matrix file path: ');
          const outputFile = await getInput('Enter output file path: ');
          
          const matrixA = parseMatrixFile(file1);
          const matrixB = parseMatrixFile(file2);
          let result;
          
          if (choice === '1') result = add(matrixA, matrixB);
          else if (choice === '2') result = subtract(matrixA, matrixB);
          else result = multiply(matrixA, matrixB);
          
          writeMatrixToFile(result, outputFile);
          console.log('Operation completed successfully!');
          break;
        case '4':
          running = false;
          break;
        default:
          console.log('Invalid choice. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  rl.close();
  console.log('Goodbye!');
}

main().catch(console.error);
