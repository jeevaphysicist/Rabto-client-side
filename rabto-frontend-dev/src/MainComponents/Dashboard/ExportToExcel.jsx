import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({data}) => {
  const exportToExcel = (datalist) => {
    const data = [
        {
          BookMark: "",
          EventID: "65b929047fbec74c0d978b7f",
          Lead: "",
          StallID: "65bafe7760eb8f99adc837bb",
          VisitorsID: "65bc854bad8d5b4cab25a6b5",
          visitorCompanyName: "",
          visitorEmailID: "diwakarroxz@gmail.com",
          visitorMobileNumber: "",
          visitorName: "Diwa Diwakar",
          __v: 0,
          _id: "65bd2e19ad8d5b4cab25bcd6"
        },
        {
            BookMark: "",
            EventID: "65b929047fbec74c0d978b7f",
            Lead: "",
            StallID: "65bafe7760eb8f99adc837bb",
            VisitorsID: "65bc854bad8d5b4cab25a6b5",
            visitorCompanyName: "",
            visitorEmailID: "diwakarroxz@gmail.com",
            visitorMobileNumber: "",
            visitorName: "Diwa Diwakar",
            __v: 0,
            _id: "65bd2e19ad8d5b4cab25bcd6"
          },
          {
            BookMark: "",
            EventID: "65b929047fbec74c0d978b7f",
            Lead: "",
            StallID: "65bafe7760eb8f99adc837bb",
            VisitorsID: "65bc854bad8d5b4cab25a6b5",
            visitorCompanyName: "",
            visitorEmailID: "diwakarroxz@gmail.com",
            visitorMobileNumber: "",
            visitorName: "Diwa Diwakar",
            __v: 0,
            _id: "65bd2e19ad8d5b4cab25bcd6"
          },
      ];
      const extractedData = datalist.map(item => ({
        visitorName: item.visitorName,
        visitorMobileNumber: item.visitorMobileNumber,
        visitorEmailID: item.visitorEmailID,
        visitorCompanyName: item.visitorCompanyName,
        Lead: item.Lead
      }))
   
    const worksheet = XLSX.utils.json_to_sheet(extractedData);
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

export default ExportToExcel;
