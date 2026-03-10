import XlsxPopulate from 'xlsx-populate';

async function testRead() {
    const wb = await XlsxPopulate.fromFileAsync("test.xlsx");
    const sheet = wb.sheet(0);
    console.log("A1:", sheet.cell("A1").value());
    console.log("B1:", sheet.cell("B1").value());
    console.log("A2:", sheet.cell("A2").value());
    console.log("B2:", sheet.cell("B2").value());
}
testRead();
