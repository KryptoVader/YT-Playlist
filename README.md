# ⏱️ YT-Playlist Duration Calculator

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)
![Fun Project](https://img.shields.io/badge/Fun_Project-🎉-brightgreen?style=for-the-badge)

## 📋 Overview

Ever wondered how much time you'll need to binge-watch that entire YouTube playlist? **YT-Playlist** is a fun and practical tool that calculates the total duration of any YouTube playlist, helping you plan your viewing time efficiently!

## 🎯 What It Does

This lightweight JavaScript application analyzes YouTube playlists and provides:
- **Total Duration**: Complete time needed to watch the entire playlist
- **Video Count**: Number of videos in the playlist
- **Average Video Length**: Mean duration per video
- **Time Breakdown**: Duration displayed in hours, minutes, and seconds

Perfect for:
- 📚 Planning learning sessions with tutorial playlists
- 🎵 Estimating music playlist lengths
- 🎬 Organizing movie/series marathons
- 📊 Analyzing content creator upload patterns

## ✨ Features

- ⚡ **Fast Calculation**: Instant results for playlists of any size
- 🎨 **Clean Interface**: Simple and intuitive user experience
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Privacy-Focused**: No data storage or tracking
- 🆓 **Free to Use**: Open source and completely free

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: YouTube Data API v3
- **Styling**: Modern CSS with responsive design

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- YouTube Data API key (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KryptoVader/YT-Playlist.git
   cd YT-Playlist
   ```

2. **Set up API credentials** (if required)
   - Get your YouTube Data API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Add your API key to the configuration file

3. **Open the application**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server
   python -m http.server 8000
   ```

4. **Access the app**
   - Navigate to `http://localhost:8000` in your browser

## 💡 Usage

1. **Copy Playlist URL**: Get the URL of any public YouTube playlist
2. **Paste URL**: Enter the playlist URL into the input field
3. **Calculate**: Click the calculate button
4. **View Results**: See the total duration and detailed breakdown

### Example

```
Input: https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxx
Output: 
  Total Duration: 12 hours 34 minutes 56 seconds
  Videos: 45
  Average Length: 16 minutes 46 seconds
```

## 📂 Project Structure

```
YT-Playlist/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styling
├── js/
│   ├── app.js         # Main application logic
│   └── api.js         # YouTube API integration
├── assets/            # Images and icons
└── README.md          # Documentation
```

## 🎨 Screenshots

[Add screenshots of your application here]

## 🔧 Configuration

To use your own YouTube API key:

```javascript
// In js/config.js or js/api.js
const API_KEY = 'YOUR_YOUTUBE_API_KEY_HERE';
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 🐛 Known Issues

- Requires public playlists (private playlists not supported)
- API rate limits may apply for heavy usage

## 🚀 Future Enhancements

- [ ] Support for multiple playlists comparison
- [ ] Playback speed adjustment calculations
- [ ] Export results to CSV/PDF
- [ ] Dark mode toggle
- [ ] Playlist statistics and analytics

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Divyansh Shekhar (KryptoVader)**

- GitHub: [@KryptoVader](https://github.com/KryptoVader)
- LinkedIn: [Divyansh Shekhar](https://www.linkedin.com/in/divyansh-shekhar-36a883330/)

## 🙏 Acknowledgments

- YouTube Data API for making this possible
- Open source community for inspiration

---

<div align="center">

**⭐ Found this useful? Give it a star and share with friends!**

*Made with ❤️ and JavaScript*

</div>
