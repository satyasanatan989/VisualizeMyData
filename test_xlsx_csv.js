import * as xlsx from 'xlsx';

const csvData = "Name,Amount\nAlice,100\nBob,150";
const wb = xlsx.read(csvData, { type: 'string' });
const ws = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws);
console.log(data);
console.log(typeof data[0].Amount);
