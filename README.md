# OpenAssets Studio

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

---

## English

### 🎮 Collaborative Game Assets & MCP Hub

OpenAssets Studio is a modern, full-stack web application built with **TypeScript** for discovering, managing, and sharing AI-powered game development assets. It serves as a unified hub connecting game developers with quality resources while integrating with Model Context Protocol (MCP) for advanced asset management.

### ✨ Key Features

- **🎨 Unified Asset Catalog** - Browse and manage 3D models, 2D graphics, shaders, scripts, and MCP tools
- **🔍 Advanced Filtering** - Search by asset type, source, engine compatibility, and custom tags
- **⬆️ Community Contributions** - Upload and share your own assets with the community
- **🛠️ MCP Terminal Integration** - Direct access to MCP tools and configuration for advanced workflows
- **📊 Analytics Dashboard** - Track download statistics and asset popularity
- **🎯 Multi-Engine Support** - Compatible with Unity, Godot, Three.js, Unreal Engine, Construct, WebXR, RPG Maker
- **⚡ Real-time Updates** - Live asset synchronization with hot module reloading (HMR)
- **🎨 Beautiful UI** - Modern interface built with React, Tailwind CSS, and Lucide React icons

### 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **Google Gemini API Key** (for AI features)

### 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/hengtuibabai/openassets.studio.git
   cd openassets.studio
   npm install
   ```

2. **Configure Environment**
   Create a `.env.local` file in the project root:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### 🏗️ Build for Production

```bash
npm run build
npm start
```

### 📁 Project Structure

```
openassets.studio/
├── src/
│   ├── components/        # React components (AssetCard, Modals, McpTerminal)
│   ├── App.tsx           # Main application component
│   ├── types.ts          # TypeScript interfaces and types
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles with Tailwind CSS
├── server.ts             # Express backend server
├── package.json          # Project dependencies
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

### 📦 Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Tailwind CSS 4, Vite 6
- **Backend**: Express.js, Node.js
- **Styling**: Tailwind CSS, Lucide React (icons), Motion (animations)
- **Build**: Vite, ESBuild
- **AI Integration**: Google Generative AI SDK

### 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (Vite + ESBuild) |
| `npm start` | Run production server |
| `npm run clean` | Remove dist directory |
| `npm run lint` | Type check with TypeScript |

### 📡 API Endpoints

- `GET /api/assets` - Fetch filtered asset catalog
- `POST /api/assets/upload` - Upload new asset
- `GET /api/assets/:id` - Get asset details
- `PUT /api/assets/:id` - Update asset information
- `POST /api/assets/:id/download` - Record download metric
- `POST /api/mcp` - Execute MCP protocol commands

### 🎯 Asset Types

- **3D Models** - 3D geometry, models, and assets
- **2D Graphics** - Sprites, textures, UI elements
- **Shaders** - GPU shader programs and effects
- **Scripts** - Reusable game code and utilities
- **MCP Tools** - Model Context Protocol integrated tools

### 🌐 Asset Sources

- **openassets** - Community-contributed assets
- **kenney** - Kenney.nl asset library
- **threejs** - Three.js resource ecosystem

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Submit a Pull Request

### 📄 License

This project is open source and available under the MIT License.

### 💬 Support

For issues, questions, or suggestions, please open a GitHub issue or contact us via email at [service@openassets.studio](mailto:service@openassets.studio).
