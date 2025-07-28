# Bitezy - Open Source Campus Food Delivery App 🍕📱

An open-source, privacy-focused food delivery application designed specifically for campus environments. Bitezy connects students with nearby restaurants while maintaining complete transparency about data usage and ensuring user privacy is never compromised.


## ✨ Features

- **🏫 Campus-Optimized**: Designed specifically for college/university environments
- **🔒 Privacy-First**: Zero data collection, transparent operations
- **📱 Cross-Platform**: React Native app for iOS and Android
- **🚀 Real-Time**: Live order tracking and delivery notifications
- **💰 Student-Friendly**: No hidden fees or inflated prices
- **🌐 Open Source**: Complete transparency with open codebase

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile development |
| **MongoDB** | Database |
| **Express.js** | Backend API server |
| **React** | Admin dashboard |
| **Node.js** | Backend runtime |
| **JWT** | Authentication |
| **Socket.io** | Real-time notifications |

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- React Native CLI
- MongoDB
- Android Studio / Xcode

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/abhijit-23blaze/Bitezy-app.git
   cd Bitezy-app
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

2. **Configure environment**
   ```bash
   # Backend .env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   
   # Frontend .env
   API_URL=http://localhost:5000
   ```

3. **Run the application**
   ```bash
   # Start backend
   cd backend && npm start
   
   # Start React Native app
   cd frontend && npx react-native run-android
   ```

## 📁 Project Structure

```
bitezy-app/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── screens/     # App screens
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API calls
│   │   └── navigation/  # Navigation setup
│   └── App.js
└── admin/               # React admin dashboard
```

## 🏫 Deploy for Your Campus

1. **Setup**: Clone and configure for your campus
2. **Restaurants**: Onboard local food vendors
3. **Students**: Launch beta with student testers
4. **Scale**: Add features based on feedback

## 🔒 Privacy Features

- **No Data Collection**: We don't store unnecessary user data
- **Local Processing**: Data stays on user devices when possible  
- **Transparent Code**: Open source for complete transparency
- **Minimal Permissions**: Only essential app permissions required

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/abhijit-23blaze/Bitezy-app/issues)
- 📧 **Email**: abhijiiitpatil@gmail.com
- 🌐 **Profile**: [Portfolio](https://abhijit-23blaze.github.io)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Show Support

⭐ Star this repo if it helped your campus community!

---

**Made with 💚 for students, by students**

*Feeding campus communities while protecting privacy*
