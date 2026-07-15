# OpenAssets Studio (日本語)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

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

問題、質問、提案については、GitHub issue を開くか、メールでご連絡ください：[service@openassets.studio](mailto:service@openassets.studio)。
