# OpenAssets Studio (简体中文)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

---

## 简体中文

### 🎮 协作式游戏资源库与 MCP 中枢

OpenAssets Studio 是一个现代的全栈 Web 应用，使用 **TypeScript** 构建，用于发现、管理和共享 AI 驱动的游戏开发资源。它作为统一的中枢，将游戏开发者与优质资源连接起来，同时集成 Model Context Protocol (MCP) 以实现高级资源管理。

### ✨ 主要特性

- **🎨 统一资源目录** - 浏览和管理 3D 模型、2D 图形、着色器、脚本和 MCP 工具
- **🔍 高级筛选** - 按资源类型、来源、引擎兼容性和自定义标签搜索
- **⬆️ 社区贡献** - 上传并与社区分享您自己的资源
- **🛠️ MCP 终端集成** - 直接访问 MCP 工具和配置，用于高级工作流
- **📊 分析仪表板** - 追踪下载统计和资源热度
- **🎯 多引擎支持** - 兼容 Unity、Godot、Three.js、Unreal Engine、Construct、WebXR、RPG Maker
- **⚡ 实时更新** - 实时资源同步和热模块替换 (HMR)
- **🎨 精美界面** - 使用 React、Tailwind CSS 和 Lucide React 图标构建的现代界面

### 📋 前置要求

- **Node.js** v16 或更高版本
- **npm** 或 **yarn** 包管理器
- **Google Gemini API 密钥**（用于 AI 功能）

### 🚀 快速开始

1. **克隆并安装**
   ```bash
   git clone https://github.com/hengtuibabai/openassets.studio.git
   cd openassets.studio
   npm install
   ```

2. **配置环境**
   在项目根目录创建 `.env.local` 文件：
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   应用将在 `http://localhost:5173` 上可用

### 🏗️ 生产构建

```bash
npm run build
npm start
```

### 📁 项目结构

```
openassets.studio/
├── src/
│   ├── components/        # React 组件（AssetCard、模态框、McpTerminal）
│   ├── App.tsx           # 主应用组件
│   ├── types.ts          # TypeScript 接口和类型
│   ├── main.tsx          # React 入口点
│   └── index.css         # 全局样式与 Tailwind CSS
├── server.ts             # Express 后端服务器
├── package.json          # 项目依赖
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 本文件
```

### 📦 技术栈

- **前端**: React 19、TypeScript 5.8、Tailwind CSS 4、Vite 6
- **后端**: Express.js、Node.js
- **样式**: Tailwind CSS、Lucide React（图标）、Motion（动画）
- **构建**: Vite、ESBuild
- **AI 集成**: Google Generative AI SDK

### 🔧 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器并启用 HMR |
| `npm run build` | 生产构建（Vite + ESBuild） |
| `npm start` | 运行生产服务器 |
| `npm run clean` | 删除 dist 目录 |
| `npm run lint` | 使用 TypeScript 进行类型检查 |

### 📡 API 端点

- `GET /api/assets` - 获取筛选后的资源目录
- `POST /api/assets/upload` - 上传新资源
- `GET /api/assets/:id` - 获取资源详情
- `PUT /api/assets/:id` - 更新资源信息
- `POST /api/assets/:id/download` - 记录下载指标
- `POST /api/mcp` - 执行 MCP 协议命令

### 🎯 资源类型

- **3D 模型** - 3D 几何体、模型和资源
- **2D 图形** - 精灵图、纹理、UI 元素
- **着色器** - GPU 着色器程序和效果
- **脚本** - 可重用的游戏代码和实用程序
- **MCP 工具** - Model Context Protocol 集成工具

### 🌐 资源来源

- **openassets** - 社区贡献的资源
- **kenney** - Kenney.nl 资源库
- **threejs** - Three.js 资源生态系统

### 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 📄 许可证

本项目是开源项目，采用 MIT 许可证。

### 💬 支持

如有问题、疑问或建议，请打开 GitHub issue，或通过邮件联系我们：[service@openassets.studio](mailto:service@openassets.studio)。
