// xlsx 파일을 "행 배열의 배열"로 읽습니다. exceljs 의존은 이 파일에만 둡니다.
const ExcelJS = require("exceljs");

async function readWorkbookRows(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const sheet = workbook.worksheets[0];
  if (!sheet) throw new Error("엑셀에 시트가 없습니다.");

  const rows = [];
  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    // exceljs의 row.values는 1부터 시작하므로 앞의 빈 칸을 버립니다.
    rows[rowNumber - 1] = row.values.slice(1);
  });
  for (let i = 0; i < rows.length; i += 1) if (!rows[i]) rows[i] = [];
  return { sheetName: sheet.name, rows };
}

module.exports = { readWorkbookRows };
