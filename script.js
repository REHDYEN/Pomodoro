let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isWorkMode = true;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const workBtn = document.getElementById('btn-work');
const breakBtn = document.getElementById('btn-break');
const statusText = document.getElementById('status-text');
const tomatoContainer = document.getElementById('tomato-container');
let completedCycles = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStatus(status) {
    statusText.textContent = `STATUS: ${status}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        updateStatus(isWorkMode ? 'WORKING...' : 'RELAXING...');
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;

                // Play a simple beep sound
                try {
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
                    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
                    osc.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.5);
                } catch(e) {
                    console.log("Audio not supported or permitted");
                }

                // Switch modes automatically
                if (isWorkMode) {
                    addTomato();
                    setMode(false);
                    updateStatus('BREAK_TIME! CLICK START');
                } else {
                    setMode(true);
                    updateStatus('WORK_TIME! CLICK START');
                }
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        updateStatus('PAUSED');
    }
}

function addTomato() {
    completedCycles++;
    const tomato = document.createElement('div');
    tomato.classList.add('cyber-tomato');
    tomatoContainer.appendChild(tomato);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    completedCycles = 0;
    tomatoContainer.innerHTML = '';
    updateDisplay();
    updateStatus('IDLE');
}

function setMode(work) {
    isWorkMode = work;

    if (work) {
        workBtn.classList.add('active');
        breakBtn.classList.remove('active');
        timeLeft = 25 * 60;
        timeDisplay.style.color = 'var(--accent-neon)';
        timeDisplay.style.textShadow = '0 0 10px var(--accent-neon), 0 0 20px rgba(252, 238, 10, 0.5), 0 0 40px rgba(252, 238, 10, 0.2)';
    } else {
        breakBtn.classList.add('active');
        workBtn.classList.remove('active');
        timeLeft = 5 * 60;
        timeDisplay.style.color = 'var(--secondary-neon)';
        timeDisplay.style.textShadow = '0 0 10px var(--secondary-neon), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2)';
    }

    clearInterval(timer);
    isRunning = false;
    updateDisplay();
    updateStatus('IDLE');
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workBtn.addEventListener('click', () => {
    if (!isWorkMode) setMode(true);
});

breakBtn.addEventListener('click', () => {
    if (isWorkMode) setMode(false);
});

// Initialize display
updateDisplay();
