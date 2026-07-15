# OpenAssets Studio

[English](#english) | [简体中文](#简体中文) | [繁體中文](#繁體中文) | [日本語](#日本語) | [한국어](#한국어)

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

For issues, questions, or suggestions, please open a GitHub issue or contact the maintainers.

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

如有问题、疑问或建议，请打开 GitHub issue 或联系维护者。

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

如有問題、疑問或建議，請開啟 GitHub issue 或聯絡維護者。

---

## 日本語

### 🎮 協調的ゲーム資産ライブラリと MCP ハブ

OpenAssets Studio は、**TypeScript** で構築された最新のフルスタック Web アプリケーションです。AI 駆動のゲーム開発資産を発見、管理、共有し、Model Context Protocol (MCP) を統合して高度な資産管理を実現します。

### ✨ 主な機能

- **🎨 統合資産カタログ** - 3D モデル、2D グラフィックス、シェーダー、スクリプト、MCP ツールを閲覧・管理
- **🔍 高度なフィルタリング** - 資産タイプ、ソース、エンジン互換性、カスタムタグで検索
- **⬆️ コミュニティ貢献** - 独自の資産をアップロードしてコミュニティと共有
- **🛠️ MCP ターミナル統合** - 高度なワークフロー向けの MCP ツール設定に直接アクセス
- **📊 分析ダッシュボード** - ダウンロード統計と資産の人気度を追跡
- **🎯 マルチエンジン対応** - Unity、Godot、Three.js、Unreal Engine、Construct、WebXR、RPG Maker に対応
- **⚡ リアルタイム更新** - ライブ資産同期とホットモジュール リローディング (HMR)
- **🎨 美しいUI** - React、Tailwind CSS、Lucide React アイコンで構築された最新のインターフェース

### 📋 前提条件

- **Node.js** v16 以上
- **npm** または **yarn** パッケージマネージャー
- **Google Gemini API キー**（AI 機能用）

### 🚀 クイックスタート

1. **クローンしてインストール**
   ```bash
   git clone https://github.com/hengtuibabai/openassets.studio.git
   cd openassets.studio
   npm install
   ```

2. **環境を設定**
   プロジェクトルートに `.env.local` ファイルを作成します：
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```
   アプリケーションは `http://localhost:5173` で利用可能になります

### 🏗️ 本番用ビルド

```bash
npm run build
npm start
```

### 📁 プロジェクト構造

```
openassets.studio/
├── src/
│   ├── components/        # React コンポーネント（AssetCard、モーダル、McpTerminal）
│   ├── App.tsx           # メイン アプリケーション コンポーネント
│   ├── types.ts          # TypeScript インターフェースと型
│   ├── main.tsx          # React エントリーポイント
│   └── index.css         # グローバル スタイルと Tailwind CSS
├── server.ts             # Express バックエンド サーバー
├── package.json          # プロジェクト依存関係
├── vite.config.ts        # Vite 設定
├── tsconfig.json         # TypeScript 設定
└── README.md             # このファイル
```

### 📦 技術スタック

- **フロントエンド**: React 19、TypeScript 5.8、Tailwind CSS 4、Vite 6
- **バックエンド**: Express.js、Node.js
- **スタイル**: Tailwind CSS、Lucide React（アイコン）、Motion（アニメーション）
- **ビルド**: Vite、ESBuild
- **AI 統合**: Google Generative AI SDK

### 🔧 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | HMR 有効で開発サーバーを起動 |
| `npm run build` | 本番ビルド（Vite + ESBuild） |
| `npm start` | 本番サーバーを実行 |
| `npm run clean` | dist ディレクトリを削除 |
| `npm run lint` | TypeScript で型チェック |

### 📡 API エンドポイント

- `GET /api/assets` - フィルター済み資産カタログを取得
- `POST /api/assets/upload` - 新しい資産をアップロード
- `GET /api/assets/:id` - 資産の詳細を取得
- `PUT /api/assets/:id` - 資産情報を更新
- `POST /api/assets/:id/download` - ダウンロード メトリクスを記録
- `POST /api/mcp` - MCP プロトコル コマンドを実行

### 🎯 資産の種類

- **3D モデル** - 3D ジオメトリ、モデル、資産
- **2D グラフィックス** - スプライト、テクスチャ、UI 要素
- **シェーダー** - GPU シェーダー プログラムと効果
- **スクリプト** - 再利用可能なゲーム コードと ユーティリティ
- **MCP ツール** - Model Context Protocol 統合ツール

### 🌐 資産ソース

- **openassets** - コミュニティ貢献の資産
- **kenney** - Kenney.nl 資産ライブラリ
- **threejs** - Three.js リソース エコシステム

### 🤝 貢献ガイド

1. このリポジトリをフォーク
2. フィーチャー ブランチを作成：`git checkout -b feature/amazing-feature`
3. 変更をコミット：`git commit -m 'Add amazing feature'`
4. ブランチにプッシュ：`git push origin feature/amazing-feature`
5. プル リクエストを送信

### 📄 ライセンス

このプロジェクトはオープンソース プロジェクトで、MIT ライセンスの下で利用可能です。

### 💬 サポート

問題、質問、提案については、GitHub issue を開くか、メンテナーに連絡してください。

---

## 한국어

### 🎮 협력적 게임 자산 라이브러리 및 MCP 허브

OpenAssets Studio는 **TypeScript**로 구축된 최신 풀 스택 웹 애플리케이션입니다. AI 기반 게임 개발 자산을 발견, 관리 및 공유하며 Model Context Protocol (MCP)를 통합하여 고급 자산 관리를 제공합니다.

### ✨ 주요 기능

- **🎨 통합 자산 카탈로그** - 3D 모델, 2D 그래픽, 셰이더, 스크립트 및 MCP 도구 열람 및 관리
- **🔍 고급 필터링** - 자산 유형, 소스, 엔진 호환성 및 사용자 정의 태그로 검색
- **⬆️ 커뮤니티 기여** - 자신의 자산을 업로드하여 커뮤니티와 공유
- **🛠️ MCP 터미널 통합** - 고급 워크플로를 위한 MCP 도구 및 구성에 직접 접근
- **📊 분석 대시보드** - 다운로드 통계 및 자산 인기도 추적
- **🎯 멀티 엔진 지원** - Unity, Godot, Three.js, Unreal Engine, Construct, WebXR, RPG Maker 지원
- **⚡ 실시간 업데이트** - 라이브 자산 동기화 및 핫 모듈 리로딩 (HMR)
- **🎨 아름다운 UI** - React, Tailwind CSS, Lucide React 아이콘으로 구축된 최신 인터페이스

### 📋 필수 요건

- **Node.js** v16 이상
- **npm** 또는 **yarn** 패키지 관리자
- **Google Gemini API 키** (AI 기능용)

### 🚀 빠른 시작

1. **복제 및 설치**
   ```bash
   git clone https://github.com/hengtuibabai/openassets.studio.git
   cd openassets.studio
   npm install
   ```

2. **환경 구성**
   프로젝트 루트에 `.env.local` 파일 생성:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **개발 서버 시작**
   ```bash
   npm run dev
   ```
   애플리케이션은 `http://localhost:5173`에서 사용 가능합니다

### 🏗️ 프로덕션 빌드

```bash
npm run build
npm start
```

### 📁 프로젝트 구조

```
openassets.studio/
├── src/
│   ├── components/        # React 컴포넌트 (AssetCard, 모달, McpTerminal)
│   ├── App.tsx           # 메인 애플리케이션 컴포넌트
│   ├── types.ts          # TypeScript 인터페이스 및 타입
│   ├── main.tsx          # React 진입점
│   └── index.css         # 글로벌 스타일 및 Tailwind CSS
├── server.ts             # Express 백엔드 서버
├── package.json          # 프로젝트 의존성
├── vite.config.ts        # Vite 설정
├── tsconfig.json         # TypeScript 설정
└── README.md             # 이 파일
```

### 📦 기술 스택

- **프론트엔드**: React 19, TypeScript 5.8, Tailwind CSS 4, Vite 6
- **백엔드**: Express.js, Node.js
- **스타일**: Tailwind CSS, Lucide React (아이콘), Motion (애니메이션)
- **빌드**: Vite, ESBuild
- **AI 통합**: Google Generative AI SDK

### 🔧 사용 가능한 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | HMR 활성화로 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 (Vite + ESBuild) |
| `npm start` | 프로덕션 서버 실행 |
| `npm run clean` | dist 디렉토리 제거 |
| `npm run lint` | TypeScript로 타입 검사 |

### 📡 API 엔드포인트

- `GET /api/assets` - 필터링된 자산 카탈로그 조회
- `POST /api/assets/upload` - 새 자산 업로드
- `GET /api/assets/:id` - 자산 세부 정보 조회
- `PUT /api/assets/:id` - 자산 정보 업데이트
- `POST /api/assets/:id/download` - 다운로드 지표 기록
- `POST /api/mcp` - MCP 프로토콜 명령 실행

### 🎯 자산 유형

- **3D 모델** - 3D 지오메트리, 모델 및 자산
- **2D 그래픽** - 스프라이트, 텍스처, UI 요소
- **셰이더** - GPU 셰이더 프로그램 및 효과
- **스크립트** - 재사용 가능한 게임 코드 및 유틸리티
- **MCP 도구** - Model Context Protocol 통합 도구

### 🌐 자산 소스

- **openassets** - 커뮤니티 기여 자산
- **kenney** - Kenney.nl 자산 라이브러리
- **threejs** - Three.js 리소스 생태계

### 🤝 기여 가이드

1. 이 저장소를 포크합니다
2. 기능 브랜치 생성: `git checkout -b feature/amazing-feature`
3. 변경 사항 커밋: `git commit -m 'Add amazing feature'`
4. 브랜치로 푸시: `git push origin feature/amazing-feature`
5. 풀 요청 제출

### 📄 라이선스

이 프로젝트는 오픈 소스 프로젝트이며 MIT 라이선스에 따라 사용할 수 있습니다.

### 💬 지원

문제, 질문 또는 제안이 있으신 경우 GitHub issue를 열거나 유지 관리자에게 문의하세요.
