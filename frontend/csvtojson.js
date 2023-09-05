const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('movies.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('movies.json', JSON.stringify(results, null, 2));
    console.log('CSV to JSON conversion completed.');
  });
