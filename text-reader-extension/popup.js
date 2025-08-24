document.addEventListener('DOMContentLoaded', () => {
    const speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    let voices = [];
    let settings = {
        voice: null,
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0
    };

    // Load voices
    function loadVoices() {
        if (speechSynthesis.getVoices().length > 0) {
            voices = speechSynthesis.getVoices();
            populateVoiceSelect();
        } else {
            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices();
                populateVoiceSelect();
            };
        }
    }

    function populateVoiceSelect() {
        const voiceSelect = document.getElementById('voiceSelect');
        voiceSelect.innerHTML = '<option value="">Default Voice</option>';
        
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    async function checkHighlightedText() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_HIGHLIGHTED_TEXT' });
            
            if (response && response.text) {
                updatePreview(response.text);
                enableReadButton();
            } else {
                updatePreview('');
                disableReadButton();
            }
        } catch (error) {
            updatePreview('');
            disableReadButton();
        }
    }

    async function readHighlightedText() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_HIGHLIGHTED_TEXT' });
            
            if (response && response.text) {
                speakText(response.text);
            } else {
                showError('No text highlighted');
            }
        } catch (error) {
            showError('Unable to read text');
        }
    }

    function speakText(text) {
        if (currentUtterance) {
            speechSynthesis.cancel();
        }

        currentUtterance = new SpeechSynthesisUtterance(text);
        
        if (settings.voice) {
            const selectedVoice = voices.find(voice => voice.name === settings.voice);
            if (selectedVoice) {
                currentUtterance.voice = selectedVoice;
            }
        }
        
        currentUtterance.rate = settings.rate;
        currentUtterance.pitch = settings.pitch;
        currentUtterance.volume = settings.volume;

        currentUtterance.onstart = () => {
            updateStatus('Speaking...', 'speaking');
            enableStopButton();
            disableReadButton();
        };

        currentUtterance.onend = () => {
            updateStatus('Ready', 'ready');
            disableStopButton();
            enableReadButton();
            currentUtterance = null;
        };

        currentUtterance.onerror = () => {
            updateStatus('Error occurred', 'error');
            disableStopButton();
            enableReadButton();
            currentUtterance = null;
        };

        speechSynthesis.speak(currentUtterance);
    }

    function stopReading() {
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
        }
        updateStatus('Ready', 'ready');
        disableStopButton();
        enableReadButton();
    }

    function updateStatus(text, type) {
        document.getElementById('statusText').textContent = text;
        document.querySelector('.status-dot').className = `status-dot ${type}`;
    }

    function updatePreview(text) {
        const previewElement = document.getElementById('previewText');
        
        if (text && text.trim()) {
            previewElement.textContent = text.length > 200 ? text.substring(0, 200) + '...' : text;
            previewElement.classList.add('has-text');
            enableReadButton();
        } else {
            previewElement.textContent = 'No text highlighted';
            previewElement.classList.remove('has-text');
            disableReadButton();
        }
    }

    function enableReadButton() {
        document.getElementById('readButton').disabled = false;
    }

    function disableReadButton() {
        document.getElementById('readButton').disabled = true;
    }

    function enableStopButton() {
        document.getElementById('stopButton').disabled = false;
    }

    function disableStopButton() {
        document.getElementById('stopButton').disabled = true;
    }

    function showError(message) {
        updateStatus(message, 'error');
        setTimeout(() => updateStatus('Ready', 'ready'), 3000);
    }

    // Event listeners
    document.getElementById('voiceSelect').addEventListener('change', (e) => {
        settings.voice = e.target.value;
    });

    document.getElementById('rateSlider').addEventListener('input', (e) => {
        settings.rate = parseFloat(e.target.value);
        document.getElementById('rateValue').textContent = e.target.value;
    });

    document.getElementById('pitchSlider').addEventListener('input', (e) => {
        settings.pitch = parseFloat(e.target.value);
        document.getElementById('pitchValue').textContent = e.target.value;
    });

    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        settings.volume = parseInt(e.target.value) / 100;
        document.getElementById('volumeValue').textContent = e.target.value;
    });

    document.getElementById('readButton').addEventListener('click', readHighlightedText);
    document.getElementById('stopButton').addEventListener('click', stopReading);

    // Initialize
    loadVoices();
    checkHighlightedText();
});
