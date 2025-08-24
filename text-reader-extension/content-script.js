class TextReaderContentScript {
    constructor() {
        this.highlightedText = '';
        this.init();
    }

    init() {
        this.setupMessageListener();
        this.setupTextSelectionListener();
        this.setupPDFSupport();
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'GET_HIGHLIGHTED_TEXT') {
                sendResponse({ text: this.highlightedText });
            }
        });
    }

    setupTextSelectionListener() {
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection && selection.toString().trim()) {
                this.highlightedText = selection.toString().trim();
                this.notifyPopup();
            } else {
                this.highlightedText = '';
                this.notifyPopup();
            }
        });

        document.addEventListener('mouseup', () => {
            const selection = window.getSelection();
            if (selection && selection.toString().trim()) {
                this.highlightedText = selection.toString().trim();
                this.notifyPopup();
            }
        });
    }

    setupPDFSupport() {
        if (window.location.href.includes('.pdf') || document.querySelector('embed[type="application/pdf"]')) {
            this.setupPDFTextExtraction();
        }
    }

    setupPDFTextExtraction() {
        const observer = new MutationObserver(() => {
            const pdfElements = document.querySelectorAll('embed[type="application/pdf"], object[type="application/pdf"]');
            pdfElements.forEach(element => {
                element.addEventListener('load', () => {
                    this.enablePDFTextSelection(element);
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    enablePDFTextSelection(pdfElement) {
        try {
            const pdfDocument = pdfElement.contentDocument || pdfElement.contentWindow.document;
            if (pdfDocument) {
                pdfDocument.addEventListener('selectionchange', () => {
                    const selection = pdfDocument.getSelection();
                    if (selection && selection.toString().trim()) {
                        this.highlightedText = selection.toString().trim();
                        this.notifyPopup();
                    }
                });
            }
        } catch (error) {
            console.log('PDF text selection not available');
        }
    }

    notifyPopup() {
        chrome.runtime.sendMessage({
            type: 'HIGHLIGHTED_TEXT_CHANGED',
            text: this.highlightedText
        });
    }
}

new TextReaderContentScript();
