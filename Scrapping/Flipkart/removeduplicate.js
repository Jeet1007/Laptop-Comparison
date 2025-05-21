const fs = require('fs');
const path = require('path');

const Apple = require('./Apple.json');
const Dell = require('./Dell.json');
const HP = require('./hp.json');
const MSI = require('./msi.json');
const asar = require('./asar.json');

const allLaptops = [...Apple, ...Dell, ...HP, ...MSI, ...asar];



function removeDuplicates(Apple) {
  const seen = new Set();
  const uniqueLaptops = [];

  for (const laptop of Apple) {
    // Using productId as the unique identifier
    if (!seen.has(laptop.productId)) {
      seen.add(laptop.productId);
      uniqueLaptops.push(laptop);
    }
  }
  return uniqueLaptops;
}

const appleLaptops = removeDuplicates(Apple);

const outputPath = path.join(__dirname, 'RemoveApple.json');
fs.writeFileSync(outputPath, JSON.stringify(appleLaptops, null, 2));

console.log(`Successfully removed duplicates! Found ${Apple.length - appleLaptops.length} duplicates.`);
console.log(`Original count: ${Apple.length}, New count: ${appleLaptops.length}`);
console.log(`Output saved to ${outputPath}`);