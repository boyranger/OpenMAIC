<!-- <p align="center">
  <img src="assets/logo-horizontal.png" alt="OpenMAIC" width="420"/>
</p> -->

<p align="center">
  <img src="assets/banner.png" alt="OpenMAIC Banner" width="680"/>
</p>

<p align="center">
  一键生成沉浸式多智能体互动课堂。
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-AGPL--3.0-blue.svg?style=flat-square" alt="License: AGPL-3.0"/></a>
  <a href="https://open.maic.chat/"><img src="https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square" alt="Live Demo"/></a>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTHU-MAIC%2FOpenMAIC&envDescription=Configure%20at%20least%20one%20LLM%20provider%20API%20key%20(e.g.%20OPENAI_API_KEY%2C%20ANTHROPIC_API_KEY).%20All%20providers%20are%20optional.&envLink=https%3A%2F%2Fgithub.com%2FTHU-MAIC%2FOpenMAIC%2Fblob%2Fmain%2F.env.example&project-name=openmaic&framework=nextjs"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="20"/></a>
  <a href="https://github.com/THU-MAIC/OpenMAIC/stargazers"><img src="https://img.shields.io/github/stars/THU-MAIC/OpenMAIC?style=flat-square" alt="Stars"/></a>
  <br/>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/LangGraph-1.1-purple?style=flat-square" alt="LangGraph"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="center">
  <a href="./README.md">English</a> | <a href="./README-zh.md">简体中文</a>
  <br/>
  <a href="https://open.maic.chat/">在线体验</a> · <a href="#-快速开始">快速开始</a> · <a href="#-功能特性">功能特性</a> · <a href="#-使用场景">使用场景</a>
</p>

## 📖 项目简介

**OpenMAIC**（Open Multi-Agent Interactive Classroom）是一个开源的 AI 互动课堂平台，能够将任何主题或文档转化为丰富的互动学习体验。基于多智能体协作引擎，它可以自动生成演示幻灯片、测验、交互式模拟实验和项目制学习活动——由 AI 教师和 AI 同学进行语音讲解、白板绘图，并与你展开实时讨论。

<!-- PLACEHOLDER: 产品概览 GIF -->
<!-- <img src="assets/overview.gif" width="100%"/> -->

### 核心亮点

- **一键生成课堂** — 描述一个主题或附上学习材料，AI 几分钟内构建完整课堂
- **多智能体课堂** — AI 老师和智能体同学实时授课、讨论、互动
- **丰富的场景类型** — 幻灯片、测验、HTML 交互式模拟、项目制学习（PBL）
- **白板 & 语音** — 智能体实时绘制图表、书写公式、语音讲解
- **灵活导出** — 下载可编辑的 `.pptx` 幻灯片或交互式 `.html` 网页

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18
- **pnpm** >= 10

### 1. 克隆 & 安装

```bash
git clone https://github.com/THU-MAIC/OpenMAIC.git
cd OpenMAIC
pnpm install
```

### 2. 配置

```bash
cp .env.example .env.local
```

至少填写一个 LLM 服务商的 API Key：

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
```

也可以通过 `server-providers.yml` 配置服务商：

```yaml
providers:
  - id: openai
    apiKey: sk-...
  - id: anthropic
    apiKey: sk-ant-...
```

支持的服务商：**OpenAI**、**Anthropic**、**Google Gemini**、**DeepSeek** 以及任何兼容 OpenAI API 的服务。

> **推荐模型：** **Gemini 3 Flash** — 效果与速度的最佳平衡。追求最高质量可选 **Gemini 3.1 Pro**（速度较慢）。

### 3. 启动

```bash
pnpm dev
```

打开 **http://localhost:3000** 开始学习！

### 4. 生产环境构建

```bash
pnpm build && pnpm start
```

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTHU-MAIC%2FOpenMAIC&envDescription=Configure%20at%20least%20one%20LLM%20provider%20API%20key%20(e.g.%20OPENAI_API_KEY%2C%20ANTHROPIC_API_KEY).%20All%20providers%20are%20optional.&envLink=https%3A%2F%2Fgithub.com%2FTHU-MAIC%2FOpenMAIC%2Fblob%2Fmain%2F.env.example&project-name=openmaic&framework=nextjs)

或者手动部署：

1. Fork 本仓库
2. 导入到 [Vercel](https://vercel.com/new)
3. 配置环境变量（至少一个 LLM API Key）
4. 部署

### Docker 部署

```bash
cp .env.example .env.local
# 编辑 .env.local 填入你的 API Key，然后：
docker compose up --build
```

### 可选：MinerU（增强文档解析）

[MinerU](https://github.com/opendatalab/MinerU) 提供更强的表格、公式和 OCR 解析能力。你可以使用 [MinerU 官方 API](https://mineru.net/) 或[自行部署](https://opendatalab.github.io/MinerU/quick_start/docker_deployment/)。

在 `.env.local` 中设置 `PDF_MINERU_BASE_URL`（如需认证则同时设置 `PDF_MINERU_API_KEY`）。

---

## ✨ 功能特性

### 课堂生成

描述你想学习的内容，或附上参考材料。OpenMAIC 的两阶段流水线自动完成剩余工作：

| 阶段 | 说明 |
|------|------|
| **大纲生成** | AI 分析你的输入，生成结构化的课堂大纲 |
| **场景生成** | 每个大纲条目生成为丰富的场景——幻灯片、测验、交互模块或 PBL 活动 |

<!-- PLACEHOLDER: 生成流水线 GIF -->
<!-- <img src="assets/generation-pipeline.gif" width="100%"/> -->

### 课堂组件

<table>
<tr>
<td width="50%" valign="top">

**🎓 幻灯片（Slides）**

AI 老师配合聚光灯和激光笔动作进行语音讲解——如同真实课堂。

<img src="assets/slides.gif" width="100%"/>

</td>
<td width="50%" valign="top">

**🧪 测验（Quiz）**

交互式测验（单选 / 多选 / 简答），支持 AI 实时判分和反馈。

<img src="assets/quiz.gif" width="100%"/>

</td>
</tr>
<tr>
<td width="50%" valign="top">

**🔬 交互式模拟（Interactive）**

基于 HTML 的交互实验，用于可视化、动手学习——物理模拟器、流程图等。

<img src="assets/interactive.gif" width="100%"/>

</td>
<td width="50%" valign="top">

**🏗️ 项目制学习（PBL）**

选择一个角色，与 AI 智能体协作完成结构化项目，包含里程碑和交付物。

<img src="assets/pbl.gif" width="100%"/>

</td>
</tr>
</table>

### 多智能体互动

- **课堂讨论** — 智能体主动发起讨论话题，你可以随时加入或被点名互动
- **圆桌辩论** — 多个不同人设的智能体围绕话题展开讨论，配合白板讲解
- **自由问答** — 随时提问，AI 老师通过幻灯片、图表或白板进行解答
- **白板** — AI 智能体在共享白板上实时绘图——逐步推导方程、绘制流程图、直观讲解概念

<img src="assets/discussion.gif" width="100%"/>


### 导出

| 格式 | 说明 |
|------|------|
| **PowerPoint (.pptx)** | 可编辑的幻灯片，包含图片、图表和 LaTeX 公式 |
| **交互式 HTML** | 自包含的网页，包含交互式模拟实验 |

### 更多功能

- **语音合成（TTS）** — 多种语音服务商，支持自定义音色
- **语音识别** — 通过麦克风与 AI 老师对话
- **网络搜索** — 智能体在课堂中搜索网络获取最新信息
- **国际化** — 界面支持中文和英文
- **暗色模式** — 深夜学习更护眼

---

## 💡 使用场景

<table>
<tr>
<td width="50%" valign="top">

> *"零基础文科生，30 分钟学会 Python"*

<img src="assets/python.gif" width="100%"/>

</td>
<td width="50%" valign="top">

> *"如何上手阿瓦隆桌游"*

<img src="assets/avalon.gif" width="100%"/>

</td>
</tr>
<tr>
<td width="50%" valign="top">

> *"分析一下智谱和 MiniMax 的股价"*

<img src="assets/zhipu-minimax.gif" width="100%"/>

</td>
<td width="50%" valign="top">

> *"DeepSeek 最新论文解析"*

<img src="assets/deepseek.gif" width="100%"/>

</td>
</tr>
</table>

---

## 🤝 参与贡献

我们欢迎社区的贡献！无论是 Bug 报告、功能建议还是 Pull Request，都非常感谢。

### 项目结构

```
OpenMAIC/
├── app/                        # Next.js App Router
│   ├── api/                    #   服务端 API 路由（约 18 个端点）
│   │   ├── generate/           #     场景生成流水线（大纲、内容、图片、TTS…）
│   │   ├── generate-classroom/ #     完整课堂生成入口
│   │   ├── chat/               #     多智能体讨论（SSE 流式传输）
│   │   ├── pbl/                #     项目制学习端点
│   │   └── ...                 #     quiz-grade, parse-pdf, web-search, transcription 等
│   ├── classroom/[id]/         #   课堂回放页面
│   └── page.tsx                #   首页（生成输入）
│
├── lib/                        # 核心业务逻辑
│   ├── generation/             #   两阶段课堂生成流水线
│   ├── orchestration/          #   LangGraph 多智能体编排（导演图）
│   ├── playback/               #   回放状态机（idle → playing → live）
│   ├── action/                 #   动作执行引擎（语音、白板、特效）
│   ├── ai/                     #   LLM 服务商抽象层
│   ├── api/                    #   Stage API 门面（幻灯片/画布/场景操作）
│   ├── store/                  #   Zustand 状态管理
│   ├── types/                  #   集中式 TypeScript 类型定义
│   ├── audio/                  #   TTS & ASR 服务商
│   ├── media/                  #   图片 & 视频生成服务商
│   ├── export/                 #   PPTX & HTML 导出
│   ├── hooks/                  #   React 自定义 Hooks（55+）
│   ├── i18n/                   #   国际化（zh-CN, en-US）
│   └── ...                     #   prosemirror, storage, pdf, web-search, utils
│
├── components/                 # React UI 组件
│   ├── slide-renderer/         #   基于 Canvas 的幻灯片编辑器和渲染器
│   │   ├── Editor/Canvas/      #     交互式编辑画布
│   │   └── components/element/ #     元素渲染器（文本、图片、形状、表格、图表…）
│   ├── scene-renderers/        #   测验、交互、PBL 场景渲染器
│   ├── generation/             #   课堂生成工具栏和进度
│   ├── chat/                   #   聊天区域和会话管理
│   ├── settings/               #   设置面板（服务商、TTS、ASR、媒体…）
│   ├── whiteboard/             #   基于 SVG 的白板绘图
│   ├── agent/                  #   智能体头像、配置、信息栏
│   ├── ui/                     #   基础 UI 组件（shadcn/ui + Radix）
│   └── ...                     #   audio, roundtable, stage, ai-elements
│
├── packages/                   # 工作区子包
│   ├── pptxgenjs/              #   定制化 PowerPoint 生成
│   └── mathml2omml/            #   MathML → Office Math 转换
│
├── configs/                    # 共享常量（形状、字体、快捷键、主题…）
└── public/                     # 静态资源（logo、头像）
```

### 核心架构

- **生成流水线** (`lib/generation/`) — 两阶段：大纲生成 → 场景内容生成
- **多智能体编排** (`lib/orchestration/`) — 基于 LangGraph 的状态机，管理智能体轮次和讨论
- **回放引擎** (`lib/playback/`) — 驱动课堂回放和实时互动的状态机
- **动作引擎** (`lib/action/`) — 执行 28+ 种动作类型（语音、白板绘图/文字/形状/图表、聚光灯、激光笔…）
- **幻灯片编辑器** (`components/slide-renderer/`) — 基于 Canvas 的编辑器，支持拖拽、旋转、缩放、文本编辑、图片裁剪

### 贡献流程

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

---

## 💼 商业合作

本项目基于 AGPL-3.0 协议开源。商业授权合作请联系：**thu_maic@tsinghua.edu.cn**

---

## 📄 许可证

本项目基于 [GNU Affero General Public License v3.0](LICENSE) 开源。
