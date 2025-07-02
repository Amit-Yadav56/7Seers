# 7Seers Dashboard Application

A modern React dashboard application built with Vite, featuring a responsive design with sidebar navigation, settings management, and file upload capabilities.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 7Seers
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🛠 Tech Stack & Choices

### Core Technologies

- **React 18** - Modern React with hooks for component state management
- **Vite** - Fast build tool and development server with HMR (Hot Module Replacement)
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Key Design Decisions

1. **Vite over Create React App**

   - Faster development server startup
   - Better build performance
   - Native ES modules support
   - More modern tooling

2. **Tailwind CSS**

   - Rapid prototyping and development
   - Consistent design system
   - Small bundle size with purging
   - Responsive design utilities

3. **Component Architecture**

   - Modular, reusable components
   - Separation of concerns (UI components vs. data logic)
   - Props-based communication between components

4. **State Management**
   - React's built-in useState for local component state
   - Props drilling for simple state sharing
   - No external state management library to keep it lightweight

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Side navigation menu
│   ├── SearchBar.jsx   # Search functionality
│   ├── ImageUpload.jsx # File upload component
│   └── InputBox.jsx    # Custom input component
├── assets/
│   └── icons/          # SVG and PNG icons
├── data/
│   └── settingsData.json # Configuration data
├── App.jsx             # Main application component
├── Settings.jsx        # Settings page component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Features

- **Responsive Design** - Mobile-first approach with responsive sidebar
- **Settings Management** - User profile and notification settings
- **File Upload** - Drag-and-drop image upload with preview
- **Search Functionality** - Global search with icon
- **Navigation** - Dynamic sidebar with page routing
- **Storage Monitoring** - Visual storage usage indicator
- **Online Status** - Real-time online/offline indicators

## 🐛 Known Issues

### Current Limitations

1. **Navigation**

   - Page routing is simulated (no actual React Router implementation)
   - Only Settings page is fully implemented
   - Menu clicks log to console but don't navigate to actual pages

2. **Image Upload**

   - File validation is basic (only checks file type)
   - No actual file upload to server
   - Images are displayed as base64 previews only
   - No file size validation beyond UI text

3. **Search Functionality**

   - Search bar is visual only - no actual search implementation
   - No search results or filtering logic

4. **Data Persistence**

   - Settings changes are not persisted (no backend integration)
   - User preferences reset on page refresh
   - No local storage implementation

5. **Mobile Experience**
   - Sidebar overlay could use better touch gestures
   - Some hover effects not optimized for touch devices

### Potential Improvements

1. **Add React Router** for proper page navigation
2. **Implement backend API** for data persistence
3. **Add form validation** for settings inputs
4. **Implement actual search functionality**
5. **Add loading states** and error handling
6. **Optimize for accessibility** (ARIA labels, keyboard navigation)
7. **Add unit tests** with Jest and React Testing Library
8. **Implement file upload to cloud storage** (AWS S3, Cloudinary)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### ESLint Configuration

The project uses ESLint with React-specific rules. For production applications, consider:

- Adding TypeScript with type-aware lint rules
- Implementing stricter ESLint configurations
- Adding Prettier for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of an internship assignment for 7Seers.
