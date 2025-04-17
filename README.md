Blog Web App
A modern, full-stack blog platform built with React, Vite, Appwrite, and Tailwind CSS. This application allows users to create, read, update, and delete blog posts with a rich text editor, user authentication, and a responsive UI. The project leverages a modular architecture and state management for a seamless user experience.
🔗 Live Demo: [Blog Web App📂](https://blog-webapp-xi.vercel.app/) Repository: [GitHub](https://github.com/ghanshyamhadiya/Blog-web)
✨ Features

User Authentication: Secure login and registration using Appwrite's authentication system.
Rich Text Editor: Create and edit blog posts with TinyMCE for a WYSIWYG experience.
CRUD Operations: Create, read, update, and delete blog posts with real-time updates.
Responsive Design: Fully responsive UI styled with Tailwind CSS for a consistent experience across devices.
State Management: Efficient state handling using Redux Toolkit.
Routing: Seamless navigation with React Router.
Animations: Smooth transitions and animations powered by Framer Motion.
Form Handling: Robust form validation and management with React Hook Form.
SEO-Friendly: Parsed HTML content for blog posts using html-react-parser.

🛠️ Tech Stack
Frontend

React: A JavaScript library for building user interfaces.
Vite: A fast, modern build tool for frontend development.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Redux Toolkit: State management for predictable state handling.
React Router: Declarative routing for seamless navigation.
Framer Motion: Animation library for smooth transitions.
React Hook Form: Performant and flexible form handling.
TinyMCE: Rich text editor for creating and editing blog content.
Lucide React: Icon library for clean and modern icons.
html-react-parser: Converts HTML strings to React elements for rendering blog content.

Backend

Appwrite: Open-source backend-as-a-service for authentication, database, and file storage.

Build Tools

ESLint: Linting for maintaining code quality.
PostCSS & Autoprefixer: For CSS processing and vendor prefixing.
Vite Plugin React: Enhances Vite with React-specific features.

📦 Dependencies
Production Dependencies
{
  "@reduxjs/toolkit": "^2.6.1",
  "@tinymce/tinymce-react": "^6.1.0",
  "appwrite": "^17.0.1",
  "framer-motion": "^12.7.3",
  "html-react-parser": "^5.2.3",
  "lucide-react": "^0.488.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.55.0",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.4.1"
}

Development Dependencies
{
  "@eslint/js": "^9.21.0",
  "@tailwindcss/forms": "^0.5.10",
  "@tailwindcss/typography": "^0.5.16",
  "@types/react": "^19.0.10",
  "@types/react-dom": "^19.0.4",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.21.0",
  "eslint-plugin-react-hooks": "^5.1.0",
  "eslint-plugin-react-refresh": "^0.4.19",
  "globals": "^15.15.0",
  "postcss": "^8.5.3",
  "tailwindcss": "^3.4.17",
  "vite": "^6.2.0"
}

🚀 Getting Started
Prerequisites

Node.js (v18 or higher)
Appwrite instance (cloud or self-hosted)
A modern web browser

Installation

Clone the repository:
git clone https://github.com/ghanshyamhadiya/Blog-web.git
cd Blog-web


Install dependencies:
npm install


Set up Appwrite:

Create an Appwrite project and configure the following:
Database for storing blog posts.
Authentication for user management.
Storage for file uploads (if applicable).


Update the Appwrite configuration in the project (e.g., src/lib/appwrite.js) with your project ID, endpoint, and API keys.


Run the development server:
npm run dev

The app will be available at http://localhost:5173.

Build for production:
npm run build


Preview the production build:
npm run preview



📂 Project Structure
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components for routing
│   ├── lib/                # Appwrite configuration and utilities
│   ├── store/              # Redux store and slices
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles with Tailwind CSS
├── .eslintrc.cjs           # ESLint configuration
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Project metadata and dependencies

🧪 Usage

Sign Up / Log In: Create an account or log in using the authentication system.
Create a Post: Use the rich text editor to write and publish blog posts.
Manage Posts: Edit or delete your posts from the dashboard.
Browse Posts: View all published posts on the homepage.

🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

Please ensure your code follows the ESLint rules and is well-documented.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
🙌 Acknowledgments

Appwrite for the backend infrastructure.
React for the frontend framework.
Tailwind CSS for styling.
Vite for the build tool.
TinyMCE for the rich text editor.


🌟 Star this repository if you find it useful!For any questions or feedback, feel free to open an issue or contact the maintainer.
