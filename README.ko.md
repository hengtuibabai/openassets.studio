# OpenAssets Studio (한국어)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

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

문제, 질문 또는 제안이 있으신 경우 GitHub issue를 열거나 이메일로 문의해 주세요: [service@openassets.studio](mailto:service@openassets.studio).
