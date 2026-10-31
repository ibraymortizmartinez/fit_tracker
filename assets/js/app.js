document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CUENTA REGRESIVA AL 18 DE NOVIEMBRE ---
    const targetDate = new Date('November 18, 2026 00:00:00').getTime();
    const countdownText = document.getElementById('countdown-text');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownText.innerHTML = "¡Llegó el día meta!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        countdownText.innerHTML = `${days}d ${hours}h ${minutes}m para el 18 Nov`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 2. SISTEMA DE RACHA (STREAK) ---
    const streakCountEl = document.getElementById('streak-count');
    const btnCheckin = document.getElementById('btn-checkin');

    let streakData = JSON.parse(localStorage.getItem('cyberFit_streak')) || { count: 0, lastDate: null };
    
    function renderStreak() {
        streakCountEl.textContent = streakData.count;
    }
    renderStreak();

    btnCheckin.addEventListener('click', () => {
        const todayStr = new Date().toDateString();
        if (streakData.lastDate === todayStr) {
            showToast('¡Ya registraste tu día hoy, carnal!');
            return;
        }

        streakData.count += 1;
        streakData.lastDate = todayStr;
        localStorage.setItem('cyberFit_streak', JSON.stringify(streakData));
        renderStreak();
        showToast('¡Día registrado con éxito! 🔥');
    });

    // --- 3. CONTROL DE HIDRATACIÓN ---
    const waterProgress = document.getElementById('water-progress');
    const waterStatus = document.getElementById('water-status');
    const btnResetWater = document.getElementById('btn-reset-water');
    const waterButtons = document.querySelectorAll('.btn-water');

    let waterData = JSON.parse(localStorage.getItem('cyberFit_water')) || { current: 0, date: null };
    const maxWater = 3.0;

    // Reset water if it's a new day
    const todayStr = new Date().toDateString();
    if (waterData.date !== todayStr) {
        waterData = { current: 0, date: todayStr };
        localStorage.setItem('cyberFit_water', JSON.stringify(waterData));
    }

    function renderWater() {
        const percentage = Math.min((waterData.current / maxWater) * 100, 100);
        waterProgress.style.width = percentage + '%';
        waterStatus.textContent = `${waterData.current.toFixed(2)} / ${maxWater} L`;
    }
    renderWater();

    waterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const addVal = parseFloat(btn.getAttribute('data-add'));
            waterData.current = Math.min(waterData.current + addVal, maxWater);
            waterData.date = new Date().toDateString();
            localStorage.setItem('cyberFit_water', JSON.stringify(waterData));
            renderWater();
            showToast(`¡Agua sumada: +${addVal * 1000}ml! 💧`);
        });
    });

    btnResetWater.addEventListener('click', () => {
        waterData.current = 0;
        localStorage.setItem('cyberFit_water', JSON.stringify(waterData));
        renderWater();
        showToast('Hidratación reiniciada a 0 L');
    });

    // --- 4. PESTAÑAS DE ENTRENAMIENTO ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = document.getElementById(`tab-${btn.getAttribute('data-tab')}`);
            if (targetTab) targetTab.classList.add('active');
        });
    });

    // --- 5. BITÁCORA RÁPIDA (NOTAS) ---
    const dailyNotes = document.getElementById('daily-notes');
    const btnSaveNotes = document.getElementById('btn-save-notes');

    dailyNotes.value = localStorage.getItem('cyberFit_notes') || '';

    btnSaveNotes.addEventListener('click', () => {
        localStorage.setItem('cyberFit_notes', dailyNotes.value);
        showToast('¡Nota guardada en el sistema! 📝');
    });

    // --- 6. TOAST NOTIFICATION HELPER ---
    function showToast(message) {
        let toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
