# WorldAtlas

A modern, responsive React application that provides information about countries around the world. Built with React, Vite, and the REST Countries API.

![WorldAtlas Screenshot](public/images/worldatlas-screenshot.png)

## Features

- **Country Information**: Browse detailed information about countries including population, region, capital, languages, and currencies
- **Search & Filter**: Search for countries by name and filter by region
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Offline Support**: Fallback data mechanism when API is unavailable
- **Contact Form**: Send messages directly from the application
- **Modern UI**: Clean, modern interface with smooth animations and transitions

## Technologies Used

- React 19
- React Router DOM
- Axios for API requests
- EmailJS for contact form functionality
- CSS for styling
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/iamamanul/WorldAtlas.git
cd WorldAtlas
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your API keys
```
# Web3Forms Configuration
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Build for Production

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist` directory.

## API

This project uses the [REST Countries API](https://restcountries.com/) to fetch country data.

## License

This project is licensed under the ISC License.

## Author

Amanul Haque

## Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing country data
- [EmailJS](https://www.emailjs.com/) for email functionality