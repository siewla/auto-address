# Singapore Address Finder - React Native App

A mobile application that auto-populates address details based on Singapore postal codes using the OneMap API. Built with React Native, Expo, and TypeScript.

https://github.com/user-attachments/assets/38761599-32c7-41ad-bc90-77149047b306


## 📱 Features

- **Postal Code Lookup**: Automatically retrieves address details by entering a Singapore postal code
- **Address Auto-Population**: Fills in building name, block number, and street name automatically
- **Input Validation**: Validates postal code format with real-time feedback
- **Clean UI**: Simple and intuitive user interface
- **TypeScript**: Type-safe code with TypeScript integration

## 🚀 Quick Start for Users

### Testing with Expo Go

1. `npm start`

2. Scan this QR code with your device camera or the Expo Go app:
   
   [QR Code Placeholder]

3. The app will load automatically in Expo Go


### API Integration
This app uses the OneMap API to fetch address details based on Singapore postal codes. The API endpoint used is:

https://www.onemap.gov.sg/api/common/elastic/search
Example request:

https://www.onemap.gov.sg/api/common/elastic/search?searchVal=320078&returnGeom=Y&getAddrDetails=Y


singapore-address-finder/
├── App.tsx                  # Main application entry point
├── app.json                 # Expo configuration
├── assets/                  # Images, fonts, and other static assets
├── src/
│   ├── components/          # React components
│   │   └── AddressForm.tsx  # Address form component
│   ├── hooks/               # Custom React hooks
│   │   └── useAddress.ts    # Hook for address fetching
│   ├── services/            # API and other services
│   │   └── addressService.ts # OneMap API service
│   └── types/               # TypeScript type definitions
│       └── types.ts         # Type definitions for the app
└── package.json             # Dependencies and scripts



## 🧑‍💻 Developer Setup


npm install -g expo-cli

npx create-expo-app autoaddress --template expo-template-blank-typescript

npm run android
npm run ios
npm run web
