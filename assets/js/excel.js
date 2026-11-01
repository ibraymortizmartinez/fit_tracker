import { state, showToast } from './state.js';

export async function exportToExcel() {
    if (typeof ExcelJS === 'undefined') {
        showToast('⚠️ Cargando librería ExcelJS, reintenta en un momento...');
        return;
    }

    showToast('📊 Generando reporte Excel profesional...');
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'CyberFit Tracker Pro';
    
    const fillNavy = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F1322' } };
    const fillHeader = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E2640' } };
    const fontTitle = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };

    const wsDash = workbook.addWorksheet('Dashboard & Resumen');
    wsDash.mergeCells('A1:F2');
    const titleCell = wsDash.getCell('A1');
    titleCell.value = 'CYBERFIT PRO — DASHBOARD DE PROGRESO Y ANALÍTICAS';
    titleCell.font = fontTitle;
    titleCell.fill = fillNavy;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    const todayISO = new Date().toISOString().split('T')[0];
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `CyberFit_Reporte_Progreso_${todayISO}.xlsx`);
    showToast('✅ ¡Reporte Excel generado con éxito!');
}