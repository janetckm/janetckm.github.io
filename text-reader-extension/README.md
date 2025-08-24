# Text Reader - Highlight to Speech Extension

A browser extension that reads highlighted text aloud in web browsers and PDF files using the Web Speech API.

## Features

- **Text-to-Speech**: Read any highlighted text on web pages
- **PDF Support**: Works with PDF files opened in the browser
- **Voice Selection**: Choose from available system voices
- **Customizable Settings**: Adjust speed, pitch, and volume
- **Modern UI**: Clean, accessible interface
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Installation

### Chrome/Edge Installation

1. **Download the Extension**
   - Clone or download this repository
   - Extract the files to a folder on your computer

2. **Load the Extension**
   - Open Chrome/Edge and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `text-reader-extension` folder

3. **Verify Installation**
   - The extension icon should appear in your browser toolbar
   - Click the icon to open the popup interface

### Firefox Installation

1. **Package the Extension**
   - Install `web-ext` globally: `npm install -g web-ext`
   - Navigate to the extension folder: `cd text-reader-extension`
   - Build the extension: `web-ext build`

2. **Load the Extension**
   - Open Firefox and go to `about:debugging`
   - Click "This Firefox" tab
   - Click "Load Temporary Add-on"
   - Select the `.zip` file created in the previous step

## Usage

### Basic Usage

1. **Highlight Text**: Select any text on a web page or PDF
2. **Open Extension**: Click the extension icon in your browser toolbar
3. **Read Text**: Click "Read Highlighted Text" button
4. **Stop Reading**: Click "Stop Reading" to stop playback

### Advanced Features

#### Voice Settings
- **Voice Selection**: Choose from available system voices
- **Speed Control**: Adjust reading speed (0.5x to 2.0x)
- **Pitch Control**: Modify voice pitch (0.5 to 2.0)
- **Volume Control**: Set volume level (0% to 100%)

#### PDF Support
- Works with PDF files opened directly in the browser
- Supports text selection in embedded PDF viewers
- Compatible with most PDF viewer plugins

## Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension manifest
- **Content Scripts**: Detects text selection on web pages and PDFs
- **Background Service Worker**: Manages extension lifecycle
- **Popup Interface**: Provides user controls and settings

### APIs Used

- **Web Speech API**: For text-to-speech functionality
- **Chrome Extensions API**: For browser integration
- **Selection API**: For detecting highlighted text

### Browser Compatibility

- **Chrome**: 88+ (Manifest V3 support)
- **Edge**: 88+ (Chromium-based)
- **Firefox**: 109+ (with limitations)

## Troubleshooting

### Common Issues

1. **No Voices Available**
   - Ensure your system has text-to-speech voices installed
   - On Windows: Check Speech settings in Control Panel
   - On macOS: Check System Preferences > Accessibility > Speech

2. **Extension Not Working on PDFs**
   - Some PDF viewers may not support text selection
   - Try opening PDFs directly in the browser
   - Ensure the PDF is not password-protected

3. **Text Not Being Detected**
   - Refresh the page and try again
   - Check if the page has any content security policies
   - Ensure the extension has proper permissions

### Debug Mode

To enable debug logging:
1. Open the extension popup
2. Right-click and select "Inspect"
3. Check the console for error messages

## Development

### Project Structure

```
text-reader-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── content-script.js     # Content script for web pages
├── content-styles.css    # Content script styles
├── background.js         # Background service worker
├── icons/                # Extension icons
└── README.md            # This file
```

### Building from Source

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd text-reader-extension
   ```

2. **Install Dependencies** (if any)
   ```bash
   npm install
   ```

3. **Load in Browser**
   - Follow the installation instructions above
   - Make changes and reload the extension

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and feature requests, please create an issue in the repository.

## Changelog

### Version 1.0.0
- Initial release
- Basic text-to-speech functionality
- Voice selection and customization
- PDF support
- Modern UI design
