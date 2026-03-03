/**
 * Chart Downloader – downloads chart element as PNG or PDF
 * Uses html2canvas + jspdf. Client-side only.
 */

export async function downloadChartAsPng(elementId: string, fileName: string = 'chart') {
    const html2canvas = (await import('html2canvas')).default;

    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element #${elementId} not found`);

    const canvas = await html2canvas(element, {
        backgroundColor: '#020817',
        scale: 2,
        useCORS: true,
        logging: false,
    });

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

export async function downloadChartAsPdf(elementId: string, fileName: string = 'chart') {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element #${elementId} not found`);

    const canvas = await html2canvas(element, {
        backgroundColor: '#020817',
        scale: 2,
        useCORS: true,
        logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`${fileName}.pdf`);
}
