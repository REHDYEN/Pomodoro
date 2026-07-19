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

                // Play Cyberpunk synthesized sounds based on the new mode
                playCyberSound(!isWorkMode);

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

let audioCtx = null;

function playCyberSound(isWork) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (isWork) {
            // Aggressive, rising sawtooth for Work Mode (Alert!)
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        } else {
            // Futuristic, relaxing sine chime for Break Mode
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch A5
            osc.frequency.setValueAtTime(1108.73, audioCtx.currentTime + 0.2); // C#6

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);

            osc.start();
            osc.stop(audioCtx.currentTime + 1.5);
        }
    } catch(e) {
        console.log("Audio not supported or permitted");
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
