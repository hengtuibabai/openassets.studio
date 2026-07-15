# OpenAssets Studio (繁體中文)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

---

## 繁體中文

### 🎮 協作式遊戲資源庫與 MCP 中樞

OpenAssets Studio 是一個現代的全棧 Web 應用，使用 **TypeScript** 構建，用於發現、管理和共享 AI 驅動的遊戲開發資源。它作為統一的中樞，將遊戲開發者與優質資源連接起來，同時集成 Model Context Protocol (MCP) 以實現高級資源管理。

### ✨ 主要特性

- **🎨 統一資源目錄** - 瀏覽和管理 3D 模型、2D 圖形、著色器、指令碼和 MCP 工具
- **🔍 高級篩選** - 按資源類型、來源、引擎相容性和自訂標籤搜尋
- **⬆️ 社群貢獻** - 上傳並與社群分享您自己的資源
- **🛠️ MCP 終端整合** - 直接存取 MCP 工具和設定，用於高級工作流程
- **📊 分析儀表板** - 追蹤下載統計和資源熱度
- **🎯 多引擎支援** - 相容 Unity、Godot、Three.js、Unreal Engine、Construct、WebXR、RPG Maker
- **⚡ 即時更新** - 即時資源同步和熱模組替換 (HMR)
- **🎨 精美介面** - 使用 React、Tailwind CSS 和 Lucide React 圖示構建的現代介面

### 📋 前置要求

- **Node.js** v16 或更新版本
- **npm** 或 **yarn** 套件管理員
- **Google Gemini API 金鑰**（用於 AI 功能）

### 🚀 快速開始

1. **複製並安裝**
   ```bash
   git clone https://github.com/hengtuibabai/openassets.studio.git
   cd openassets.studio
   npm install
   ```

2. **設定環境**
   在專案根目錄建立 `.env.local` 檔案：
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   應用將在 `http://localhost:5173` 上可用

### 🏗️ 生產構建

```bash
npm run build
npm start
```

### 📁 專案結構

```
openassets.studio/
├── src/
│   ├── components/        # React 元件（AssetCard、模態視窗、McpTerminal）
│   ├── App.tsx           # 主應用元件
│   ├── types.ts          # TypeScript 介面和類型
│   ├── main.tsx          # React 入口點
│   └── index.css         # 全域樣式與 Tailwind CSS
├── server.ts             # Express 後端伺服器
├── package.json          # 專案相依性
├── vite.config.ts        # Vite 設定
├── tsconfig.json         # TypeScript 設定
└── README.md             # 本檔案
```

### 📦 技術棧

- **前端**: React 19、TypeScript 5.8、Tailwind CSS 4、Vite 6
- **後端**: Express.js、Node.js
- **樣式**: Tailwind CSS、Lucide React（圖示）、Motion（動畫）
- **構建**: Vite、ESBuild
- **AI 整合**: Google Generative AI SDK

### 🔧 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器並啟用 HMR |
| `npm run build` | 生產構建（Vite + ESBuild） |
| `npm start` | 執行生產伺服器 |
| `npm run clean` | 刪除 dist 目錄 |
| `npm run lint` | 使用 TypeScript 進行類型檢查 |

### 📡 API 端點

- `GET /api/assets` - 取得篩選後的資源目錄
- `POST /api/assets/upload` - 上傳新資源
- `GET /api/assets/:id` - 取得資源詳情
- `PUT /api/assets/:id` - 更新資源資訊
- `POST /api/assets/:id/download` - 記錄下載指標
- `POST /api/mcp` - 執行 MCP 協定命令

### 🎯 資源類型

- **3D 模型** - 3D 幾何體、模型和資源
- **2D 圖形** - 精靈圖、紋理、UI 元素
- **著色器** - GPU 著色器程式和效果
- **指令碼** - 可重用的遊戲程式碼和實用程式
- **MCP 工具** - Model Context Protocol 整合工具

### 🌐 資源來源

- **openassets** - 社群貢獻的資源
- **kenney** - Kenney.nl 資源庫
- **threejs** - Three.js 資源生態系統

### 🤝 貢獻指南

1. Fork 本儲存庫
2. 建立特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 📄 授權

本專案是開源專案，採用 MIT 授權。

### 💬 支援

如有問題、疑問或建議，請開啟 GitHub issue，或透過電子郵件與我們聯絡：[service@openassets.studio](mailto:service@openassets.studio)。
