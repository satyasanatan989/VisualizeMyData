import XlsxPopulate from 'xlsx-populate';

async function test() {
    const wb = await XlsxPopulate.fromBlankAsync();
    const sheet = wb.sheet(0);
    sheet.cell(1, 1).value([["A", "B"], [1, 2]]);
    await wb.toFileAsync("test.xlsx");
    console.log("Done");
}
test();
