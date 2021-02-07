import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

async function loadCSV(filePath: string): any[] {
  const readCSVStream = fs.createWriteStream(filePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);
  const lines = [];

  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });
}

const csvFilePath = path.resolve(__dirname, '..', '..', 'transactions.csv');
const data = loadCSV(csvFilePath);
