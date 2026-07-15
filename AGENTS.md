# OpenAssets Studio - AI Agent Development & Iteration Guide / 开发者指令与约束指南

This document contains persistent development rules, project conventions, and architecture constraints for **OpenAssets Studio**. Any future AI Agent or developer working on this codebase **MUST** strictly adhere to these instructions.

本文件包含 **OpenAssets Studio** 的持久开发规则、项目约定和架构约束。任何未来的 AI Agent 或开发者在修改此代码库时，**必须**严格遵守以下指令。

---

## 🏗️ 1. Architecture & Dual-Mode Fallback Design / 双模降级架构设计

The application runs in two possible environments:
1. **Full-stack Mode (Local/Dev Server):** A Node/Express server (`server.ts`) handles dynamic APIs (`/api/assets`, `/api/mcp`) and runs on port 3000.
2. **Static-only Mode (Static Hosts, e.g., Cloudflare Pages/Vercel):** The production deployment may serve ONLY static files compiled to `dist/`, where dynamic backend endpoints are unavailable and requests to `/api/*` fall back to returning `index.html`.

### 🚨 Critical Constraints for Agents:
- **No Hard Dependency on Backend APIs:** The frontend React app (`src/App.tsx`) must always use a **Dual-Mode System**. If a fetch request to `/api/assets` fails, throws a network error, or returns a non-JSON response (such as HTML), the application **MUST** gracefully fallback to importing and filtering the local bundled assets static file directly from `data/assets.json`.
- **JSON Content Type Checking:** When fetching from APIs, always check the `content-type` header. If it doesn't contain `application/json`, trigger the local fallback instead of breaking the UI.
- **Graceful MCP Error Handling:** The MCP Terminal (`src/components/McpTerminal.tsx`) must gracefully capture non-JSON/HTML responses and show a helpful user-facing warning explaining that the backend service is currently offline or running in static-only mode.

---

## 🌐 2. Multi-Language Documentation Layout / 多语言文档维护规范

- **English First:** `README.md` at the root directory is strictly for the English version.
- **Dedicated Language Files:** Other translations are split into dedicated files at the root directory:
  - Simplified Chinese: `README.zh-CN.md`
  - Traditional Chinese: `README.zh-TW.md`
  - Japanese: `README.ja.md`
  - Korean: `README.ko.md`
- **Link Integrity:** Keep the language navigation bar consistent across all files:
  ```markdown
  [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)
  ```
- **Email Contact:** Always display our official contact email: `service@openassets.studio` in the "Support" or "💬 支援" section at the bottom of all README files.

---

## 📊 3. Asset Schema and Core Types / 资源规范与核心数据结构

All asset models must comply with the `Asset` interface declared in `src/types.ts`:

- **Data Consistency:** Keep the schema clean. Never inject unmapped attributes into the assets data structure.
- **Dynamic Local Data:** The `data/assets.json` contains ~50 static high-quality assets. Any edit to this file must validate against standard JSON formatting. Keep titles, descriptions, categories, and tags accurate to help developers search assets effectively.
- **Supported Engines:** Unity, Godot, Three.js, Unreal Engine, Construct, WebXR, RPG Maker.

---

## 🎨 4. Design & Typography / 视觉规范与设计理念

- **Cosmic Slate Theme:** Stick to a high-contrast dark visual design utilizing deep slates (`bg-slate-950`, `bg-slate-900`), border highlights (`border-slate-800`), and neon cyan/purple interactive focus states (`text-cyan-400`, `shadow-cyan-500/20`).
- **Interactive States:** Use smooth Framer Motion transitions (`motion/react`) for cards and modals.
- **Touch Targets:** Make sure all interactive elements (buttons, sliders, filter tabs) have touch friendly margins and hit boxes (at least 44px).
- **Icons:** Use ONLY icons imported from `lucide-react`. Custom inline SVGs are forbidden.

---

## 🛠️ 5. Development Workflow Constraints / 开发流程约束

- **Dependency Installation:** Call `install_applet_package` for new dependencies BEFORE importing them.
- **Verification Rule:** Always run `lint_applet` followed by `compile_applet` to confirm successful TypeScript compilation before ending your turn.
- **Port Assignment:** If modifying scripts, the dev server must bind to host `0.0.0.0` and port `3000`. Do not modify Vite port settings unless explicitly instructed.
