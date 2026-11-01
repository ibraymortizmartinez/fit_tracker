// assets/js/charts.js
import { state } from './state.js';
import { routinePresets } from './presets.js';

let chartVolInstance = null;
let chartWaterInstance = null;
let chartExHistoryInstance = null;

export function initCharts() {
    if (typeof Chart === 'undefined') return;
    if (chartVolInstance) chartVolInstance.destroy();
    if (chartWaterInstance) chartWaterInstance.destroy();

    const currentPresetKey = state.selectedRoutine || 'ppl';
    const currentPreset = routinePresets[currentPresetKey] || routinePresets.ppl;
    const tabsToGraph = currentPreset.tabs.filter(tabKey => tabKey !== 'neat');
    const labels = tabsToGraph.map(tabKey => currentPreset.tabLabels[tabKey] || tabKey);

    const volumeData = tabsToGraph.map(tabKey => {
        const exercises = state.routines[tabKey] || [];
        let totalVolume = 0;
        exercises.forEach(ex => {
            (ex.sets || []).forEach(set => {
                const weight = parseFloat(set.weight) || 0;
                const reps = parseFloat(set.reps) || 0;
                totalVolume += (weight * reps);
            });
        });
        return totalVolume;
    });

    const canvasVol = document.getElementById('chart-volume');
    if (canvasVol) {
        chartVolInstance = new Chart(canvasVol.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{ label: 'Volumen Total (kg)', data: volumeData, backgroundColor: '#00f2fe', borderRadius: 6 }]
            },
            options: { responsive: true, plugins: { legend: { labels: { color: '#f8fafc' } } } }
        });
    }

    const canvasWater = document.getElementById('chart-water');
    if (canvasWater) {
        chartWaterInstance = new Chart(canvasWater.getContext('2d'), {
            type: 'line',
            data: {
                labels: Object.keys(state.water.history).slice(-7),
                datasets: [{ label: 'Litros Consumidos', data: Object.values(state.water.history).slice(-7), borderColor: '#4facfe', fill: true }]
            },
            options: { responsive: true, plugins: { legend: { labels: { color: '#f8fafc' } } } }
        });
    }
}

export function showExerciseHistory(exId) {
    const modal = document.getElementById('modal-ex-history');
    const titleEl = document.getElementById('modal-ex-title');
    const summaryEl = document.getElementById('ex-history-summary');
    const canvas = document.getElementById('chart-ex-history');

    if (!modal || !canvas) return;

    let targetEx = null;
    Object.keys(state.routines).forEach(tab => {
        const found = (state.routines[tab] || []).find(e => e.id === exId);
        if (found) targetEx = found;
    });

    if (!targetEx) return;

    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-chart-line"></i> ${targetEx.name}`;

    const labels = (targetEx.sets || []).map((_, i) => `Serie #${i + 1}`);
    const weights = (targetEx.sets || []).map(s => parseFloat(s.weight) || 0);

    const maxWeight = Math.max(...weights, 0);
    const totalVol = weights.reduce((acc, w, i) => acc + (w * (parseFloat(targetEx.sets[i].reps) || 0)), 0);

    if (summaryEl) {
        summaryEl.innerHTML = `
            <p>🏆 <strong>Carga Máxima de hoy:</strong> ${maxWeight} kg</p>
            <p>📦 <strong>Volumen Total Movido:</strong> ${totalVol} kg</p>
        `;
    }

    if (chartExHistoryInstance) chartExHistoryInstance.destroy();

    chartExHistoryInstance = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Carga por Serie (kg)',
                data: weights,
                borderColor: '#00f2fe',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 6,
                pointBackgroundColor: '#00f2fe'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#f8fafc' } } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });

    modal.classList.add('active');
}

window.showExerciseHistory = showExerciseHistory;