import { state } from './state.js';
import { routinePresets } from './presets.js';

let chartVolInstance = null;
let chartWaterInstance = null;

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