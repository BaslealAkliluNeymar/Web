 const PrintData = (rowData:any) => {

  const printWindow = window.open('', '', 'width=800,height=600');
  const htmlContent = `
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1 { color: #333; 
        </style>
      </head>
      <body>
        <h1>Delivery Report</h1>
        <p><strong>Delivery ID:</strong> ${rowData.name}</p>
        <p><strong>Order ID:</strong> ${rowData.age}</p>
        <p><strong>Health Facility:</strong> ${rowData.class}</p>
        <script>
          window.addEventListener('load',(event) => {
            window.print();
            window.onafterprint = () => window.close();
      });
        </script>
      </body>
    </html>
  `;

  printWindow?.document.write(htmlContent);
  printWindow?.document.close();
};


export default PrintData