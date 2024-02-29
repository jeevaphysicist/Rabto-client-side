import React from 'react';
import * as XLSX from 'xlsx';

const ExportTOFullExcel = ({data}) => {
    // console.log("data",data);
  const exportToExcel = (datalist) => {      
    const worksheet = XLSX.utils.json_to_sheet(datalist);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a download link
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported_data.xlsx';
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={()=>exportToExcel(data)}>Export to Excel</button>
  );
};

export default ExportTOFullExcel;
