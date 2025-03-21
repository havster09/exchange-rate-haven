# Exchange Rate Haven

A modern currency exchange rate application that provides real-time currency conversion.

## Features

- Real-time currency exchange rates
- Support for multiple currencies with country flags
- Interactive currency conversion with market rates
- Visual progress indicator for rate updates
- Error handling with user-friendly messages
- Rate markup calculation (0.5%)

## Tech Stack

### Frontend

- React
- React Router
- CSS Modules for styling
- SVG icons

### Key Components

- Custom hooks for animation frames
- Reusable UI components (DropDown, TextInput, ProgressBar, Loader)
- State management using React's useReducer and useState
- Error boundary implementation
- Responsive layout using modern CSS

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x"
  },
  "devDependencies": {
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "jest": "^29.x"
  }
}
```

## Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── DropDown/
│   ├── Flag/
│   ├── Loader/
│   ├── ProgressBar/
│   └── TextInput/
├── Hooks/              # Custom React hooks
├── Icons/              # SVG icons
├── Layouts/            # Layout components
├── Libs/               # Static data and utilities
├── Pages/             # Page components
│   └── Rates/         # Main rates page
└── api/               # API integration
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/exchange-rate-haven.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run tests:

```bash
npm test
```

## TODO / Wishlist

### TypeScript Migration

- [ ] Convert the entire codebase to TypeScript
- [ ] Add type definitions for all components and hooks
- [ ] Implement interfaces for API responses
- [ ] Add strict type checking
- [ ] Update build configuration for TypeScript

### Enhanced Responsive Design

- [ ] Implement mobile-first approach
- [ ] Add breakpoints for tablets and larger screens
- [ ] Improve touch interactions for mobile users
- [ ] Optimize layout for different screen orientations
- [ ] Enhance accessibility for all device sizes

### Accessibility Improvements

- [ ] Add keyboard navigation support
- [ ] Currency dropdown keyboard controls
- [ ] Keyboard shortcuts for common actions
- [ ] Focus management

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
