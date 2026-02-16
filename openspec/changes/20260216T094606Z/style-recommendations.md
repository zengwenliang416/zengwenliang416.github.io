# Style Recommendation - Apple-Inspired Developer Portfolio

## Design Philosophy
融合 Apple 官网的设计语言与开发者个人品牌展示：
- **极简主义**：大量留白，每个区域只传达一个核心信息
- **滚动叙事**：页面像讲故事一样，随滚动逐帧展开内容
- **超大排版**：粗体标题占据视觉中心，文案精炼有力
- **精致动效**：微妙但有质感的 Framer Motion 动画
- **暗色基调**：深色背景 + 高对比度渐变文字

## Color Palette

```
Background:    #000000 → #0a0a0a (纯黑，苹果风)
Surface:       #1a1a1a (卡片/区块背景)
Border:        rgba(255,255,255,0.08)
Glass:         rgba(255,255,255,0.04) + blur(20px)

Text Primary:  #f5f5f7 (苹果标准白)
Text Secondary:#86868b (苹果灰)
Text Dimmed:   #6e6e73

Gradient Hero: linear-gradient(to right, #2997ff, #a855f7, #ec4899)
               (蓝 → 紫 → 粉，Apple Intelligence 同款渐变)
Accent Blue:   #2997ff (苹果蓝)
Accent Purple: #a855f7
Accent Pink:   #ec4899
```

## Typography

```
Display:  SF Pro Display / Inter (900 weight, -0.03em tracking)
Body:     SF Pro Text / Inter (400 weight)
Code:     SF Mono / JetBrains Mono
```

- Hero 标题：`clamp(48px, 8vw, 96px)`，极粗
- Section 标题：`clamp(32px, 5vw, 56px)`
- 正文：`17px`（苹果标准正文尺寸）

## Page Structure

### Section 1: Hero (100vh)
- 纯黑背景 + 微妙粒子/星尘效果（React Three Fiber, 非常克制）
- 居中超大名字，渐变色 gradient text
- 副标题用打字机效果
- 极简 CTA：仅一个 "Explore my work ↓"
- Apple 风格：内容少而精，一屏只说一件事

### Section 2: "What I Build" (滚动展开)
- 三个大卡片横排，每个代表一个领域：
  - AI Tooling | Full-Stack Apps | Open Source
- 每个卡片滚动到时 scale + fade in
- 悬停时卡片微微浮起 + 渐变边框发光

### Section 3: Stats (数字冲击力)
- Apple 风格的大数字展示
- `43+` repos, `80+` stars, `6` languages, `2` papers
- 数字用 `clamp(64px, 10vw, 120px)` 超大渐变色
- 每个数字旁边一行简短描述
- 滚动到时 countUp 动画

### Section 4: Tech Stack
- 按类别分组的标签云
- 悬停标签时微妙发光 + 放大
- 分类标题用 section label 风格

### Section 5: Featured Projects
- 每个项目独占大面积空间（Apple 产品展示风格）
- 项目名超大字体 + 一句话描述
- 技术栈标签 + star 数
- 悬停时卡片背景渐变色流动
- 2 列网格，卡片圆角 24px

### Section 6: Publications
- 简洁列表，论文名 + 摘要
- 左侧学术图标装饰

### Section 7: Footer
- 极简，居中对齐
- GitHub + Email 链接
- Copyright

## Animation Strategy (Framer Motion)

```
进入动画: opacity 0→1, y 30→0, duration 0.8s, ease [0.16, 1, 0.3, 1]
延迟叠加: 每个子元素 stagger 0.1s
数字动画: countUp with spring physics
悬停: scale 1.02, transition 0.3s
卡片: 微妙 3D tilt on mouse move (最大 ±3°, 比原版更克制)
```

## React Component Architecture

```
src/
├── App.tsx
├── main.tsx
├── index.css (TailwindCSS)
├── components/
│   ├── Navigation.tsx      (固定导航 + glassmorphism)
│   ├── Hero.tsx             (3D 背景 + 大标题)
│   ├── HeroCanvas.tsx       (React Three Fiber 星尘)
│   ├── WhatIBuild.tsx       (三领域卡片)
│   ├── Stats.tsx            (大数字展示)
│   ├── TechStack.tsx        (技能标签)
│   ├── Projects.tsx         (项目网格)
│   ├── ProjectCard.tsx      (单个项目卡片)
│   ├── Publications.tsx     (论文列表)
│   ├── Footer.tsx           (页脚)
│   └── ui/
│       ├── GradientText.tsx  (渐变文字组件)
│       ├── RevealOnScroll.tsx (滚动显示组件)
│       ├── CountUp.tsx       (数字动画组件)
│       └── TypeWriter.tsx    (打字机效果)
└── data/
    └── content.ts           (所有内容数据)
```

## Tech Stack

- **React 18** + **Vite**
- **TailwindCSS v4**
- **Framer Motion** (动画)
- **@react-three/fiber** + **@react-three/drei** (3D 背景)
- **GitHub Actions** (自动部署到 GitHub Pages)
