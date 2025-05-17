// index.js
const readline = require('readline');
const { parseMatrixFile, writeMatrixToFile } = require('./file-io');
const { add, subtract, multiply } = require('./operations');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const prompt = (q) => new Promise(resolve => rl.question(q, resolve));

(async () => {
  try {
    const op = (await prompt("Choose operation (add/subtract/multiply): ")).trim();
    const f1 = await prompt("Enter path for first matrix: ");
    const f2 = await prompt("Enter path for second matrix: ");
    const out = await prompt("Enter output file path: ");

    const a = parseMatrixFile(f1.trim());
    const b = parseMatrixFile(f2.trim());

    const result = ({ add, subtract, multiply }[op])(a, b);
    writeMatrixToFile(result, out.trim());
    console.log("Operation complete.");
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    rl.close();
  }
})();
