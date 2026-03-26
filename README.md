# OpenXML Inspector

> 检查、编辑和理解 OpenXML 文档的强大工具

OpenXML Inspector 是一个基于 Tauri 和 Vue 3 构建的桌面应用程序，旨在帮助开发者深入探索 Microsoft Office 文档（Word .docx、Excel .xlsx、PowerPoint .pptx）的内部结构。

## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [安装指南](#安装指南)
- [使用方法](#使用方法)
- [开发指南](#开发指南)
- [项目结构](#项目结构)
- [贡献指南](#贡献指南)
- [许可证](#许可证)
- [长期规划](#长期规划)

## 项目简介

Microsoft Office 文档本质上是一个 ZIP 压缩包，内部包含 XML 文件、资源文件（图片、视频、字体等）和其他元数据。OpenXML Inspector 允许你：

- 将 Office 文档视为文件系统进行浏览
- 查看和编辑内部的 XML 配置
- 预览嵌入的图片和视频资源
- 理解文档结构和关系

这对于需要：
- 理解 Office 文档格式的开发者
- 进行文档自动化的工程师
- 调试文档渲染问题的技术人员
- 学习 Office OpenXML 标准的学习者

都是极好的工具。

## 功能特性

### 核心功能

- **文档解析**：支持解析 `.docx`、`.xlsx`、`.pptx` 格式的 Office 文档
- **文件树浏览**：以树形结构展示文档内部的所有文件和目录
- **多格式预览**：
  - XML/VML 文件：使用 CodeMirror 6 进行语法高亮显示
  - 图片文件：支持 PNG、JPG、JPEG、GIF、SVG 格式的图片预览
  - 视频文件：支持 MP4、AVI、MOV 格式的视频播放
- **代码编辑**：内置代码编辑器，支持 XML/HTML/JavaScript 语法高亮
- **代码格式化**：使用 vkbeautify 对 XML 文件进行智能格式化
- **快速操作**：支持一键复制文件内容

### 交互体验

- **智能目录管理**：
  - 支持全部展开/折叠目录树
  - 自动过滤空目录节点
  - 文件类型图标识别
- **响应式设计**：自适应窗口大小，支持桌面和移动端视图
- **状态管理**：加载状态提示、错误信息展示
- **窗口管理**：关闭窗口时隐藏到托盘，而非完全退出

## 技术栈

### 前端

- **框架**：Vue 3 (Composition API)
- **语言**：TypeScript
- **构建工具**：Vite
- **代码编辑器**：CodeMirror 6
  - XML 语言支持
  - HTML 语言支持
  - JavaScript 语言支持
- **文件解析**：JSZip
- **代码格式化**：vkbeautify
- **包管理器**：pnpm

### 后端

- **框架**：Tauri 2.x
- **语言**：Rust (Edition 2021)
- **特性**：
  - 托盘图标支持
  - 窗口管理
  - 原生系统集成
- **平台支持**：
  - macOS
  - Windows
  - Linux

### 开发工具

- **TypeScript 编译**：vue-tsc
- **代码规范**：Prettier
- **图标生成**：Python 脚本

## 安装指南

### 环境要求

- **Node.js**：>= 24.0.0
- **pnpm**：>= 10.0.0
- **Rust**（如需构建原生应用）
  - macOS：`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
  - Windows：下载并安装 [rustup](https://rustup.rs/)
  - Linux：`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

### 快速开始

1. **克隆仓库**

```bash
git clone https://github.com/your-username/OpenXML-Inspector.git
cd OpenXML-Inspector
```

2. **安装依赖**

```bash
pnpm install
```

3. **开发模式运行**

```bash
pnpm run dev
```

这将同时启动前端开发服务器和 Tauri 开发模式。

4. **构建生产版本**

```bash
# 构建桌面应用（全平台）
pnpm run build:desktop

# 仅构建 Web 版本
pnpm run build:web

# 构建 macOS DMG 安装包
pnpm run bundle:dmg
```

### 从发布版本安装

（待发布时补充）

## 使用方法

### 基本使用

1. **打开应用**：启动 OpenXML Inspector
2. **上传文档**：点击顶部工具栏的"选择文件"按钮，选择一个 `.docx`、`.xlsx` 或 `.pptx` 文件
3. **浏览结构**：左侧面板将显示文档的内部目录结构
4. **查看内容**：点击任意文件，右侧面板将显示其内容

### 高级操作

#### 查看 XML 文件

1. 在目录树中找到 `.xml` 文件并点击
2. XML 内容会自动格式化显示，带有语法高亮
3. 点击"格式化"按钮可重新格式化代码

#### 预览图片

1. 在目录树中找到图片文件（`.png`、`.jpg`、`.svg` 等）
2. 图片会在预览区显示
3. 可以直接查看嵌入的文档图片

#### 观看视频

1. 如果文档中包含视频（`.mp4`、`.mov` 等）
2. 点击视频文件，可在预览区播放

#### 复制内容

1. 选择任意文件查看
2. 点击右上角的"复制"按钮
3. 文件内容将复制到剪贴板

### 快捷操作

- **全部展开**：点击"全部展开"按钮，展开整个目录树
- **全部折叠**：点击"全部折叠"按钮，收起所有目录
- **窗口最小化**：点击窗口关闭按钮，应用将隐藏到托盘

## 开发指南

### 项目结构

```
OpenXML-Inspector/
├── src/                          # 前端源代码
│   ├── components/               # Vue 组件
│   │   ├── FileTree.vue         # 文件树组件
│   │   ├── FilePreview.vue      # 文件预览组件
│   │   └── CodeEditor.vue       # 代码编辑器组件
│   ├── App.vue                   # 主应用组件
│   ├── main.ts                   # 应用入口
│   └── vkbeautify.d.ts          # vkbeautify 类型定义
├── src-tauri/                    # Tauri 后端源代码
│   ├── src/
│   │   └── main.rs              # Rust 主程序
│   ├── capabilities/             # Tauri 权限配置
│   ├── gen/                      # 自动生成的代码
│   ├── icons/                    # 应用图标
│   ├── build.rs                 # 构建脚本
│   ├── Cargo.toml               # Rust 依赖配置
│   └── tauri.conf.json          # Tauri 配置文件
├── public/                       # 静态资源
├── index.html                    # HTML 入口
├── package.json                  # Node.js 依赖和脚本
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 配置
├── generate_icon.py             # 图标生成脚本
├── icon.png                     # 应用图标
└── icon.svg                     # 应用图标（矢量）
```

### 核心模块说明

#### FileTree.vue

负责展示文档的文件目录结构：

- 递归渲染目录和文件
- 支持展开/折叠操作
- 文件类型图标识别
- 文件选择事件传递

#### FilePreview.vue

负责文件内容的展示：

- XML/VML 文件的语法高亮和格式化
- 图片/视频文件的预览
- 复制和格式化功能按钮
- CodeMirror 编辑器的生命周期管理

#### App.vue

主应用组件，负责：

- 文件上传和解析
- 使用 JSZip 解压 Office 文档
- 构建文件系统结构
- 协调子组件的交互

#### main.rs (Tauri 后端)

Rust 后端，负责：

- 窗口生命周期管理
- 窗口隐藏而非关闭
- 系统托盘集成（未来扩展）

### 添加新功能

#### 支持新的文件类型

1. 在 `FileTree.vue` 中添加文件类型识别：
   ```typescript
   if (fileName.endsWith('.新扩展名')) {
     return '新图标';
   }
   ```

2. 在 `FileTree.vue` 的 `selectFile` 方法中添加类型判断：
   ```typescript
   if (filePath.endsWith('.新扩展名')) {
     type = '新类型';
   }
   ```

3. 在 `FilePreview.vue` 中添加对应的预览逻辑

#### 添加新的 CodeMirror 语言支持

1. 安装对应语言包：
   ```bash
   pnpm add @codemirror/lang-新语言
   ```

2. 在 `FilePreview.vue` 中导入并使用：
   ```typescript
   import { 新语言 } from '@codemirror/lang-新语言';
   ```

### 调试技巧

#### 前端调试

- 使用浏览器开发者工具（Tauri 开发模式自动打开）
- Console 输出调试信息
- Vue DevTools 插件（需手动安装）

#### 后端调试

```bash
# 使用 Tauri CLI 的详细日志模式
pnpm run tauri dev -- --verbose
```

### 构建和发布

#### 开发构建

```bash
pnpm run build
```

#### 生产构建

```bash
# macOS
pnpm run bundle:dmg

# Windows
pnpm run tauri build

# Linux
pnpm run tauri build
```

构建产物位于 `src-tauri/target/release/bundle/` 目录。

## 贡献指南

欢迎任何形式的贡献！

### 报告 Bug

在提交 Issue 之前，请先搜索是否已有相同问题。提交时请包含：

- 详细的问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（操作系统、应用版本）
- 截图或日志（如适用）

### 提交代码

1. **Fork** 本仓库
2. 创建特性分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m '添加新功能'`
4. 推送分支：`git push origin feature/新功能`
5. 提交 Pull Request

### 代码规范

- 使用 Prettier 格式化代码
- 遵循 TypeScript 类型检查：`pnpm run typecheck`
- 编写清晰的提交信息
- 为新功能添加必要的注释

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

Copyright (c) 2026 Eiinu

## 长期规划

### 第一阶段：核心功能完善（v0.2 - v0.5）

#### 功能增强
- [ ] **拖拽上传**：支持直接拖拽文件到应用窗口
- [ ] **最近文件**：记录最近打开的文件，快速访问
- [ ] **文件搜索**：在目录树中搜索文件名
- [ ] **文件信息面板**：显示选中文件的详细信息（大小、类型、路径等）
- [ ] **多标签页**：支持同时打开多个文件进行对比
- [ ] **导出功能**：将文件导出到本地

#### 性能优化
- [ ] **大文件处理**：优化大文件的加载和渲染性能
- [ ] **虚拟滚动**：在文件树和内容预览中实现虚拟滚动
- [ ] **懒加载**：实现文件内容的按需加载
- [ ] **缓存机制**：缓存已解析的文档内容

### 第二阶段：高级功能（v0.6 - v1.0）

#### 编辑功能
- [ ] **实时编辑**：允许编辑 XML 文件并保存回文档
- [ ] **版本历史**：记录编辑历史，支持撤销/重做
- [ ] **差异对比**：对比不同版本或不同文档的差异
- [ ] **批量替换**：在多个文件中批量搜索和替换内容

#### 分析功能
- [ ] **文档分析**：分析文档结构，生成可视化图表
- [ ] **关系图**：绘制文件之间的引用关系
- [ ] **样式分析**：提取和分析文档的样式信息
- [ ] **资源统计**：统计图片、字体、视频等资源的使用情况

#### 导出功能
- [ ] **批量导出**：一键导出所有图片、字体等资源
- [ ] **格式转换**：将文档转换为其他格式
- [ ] **生成报告**：生成文档结构分析报告

### 第三阶段：生态系统（v1.0+）

#### 插件系统
- [ ] **插件架构**：设计可扩展的插件系统
- [ ] **插件 API**：提供完整的插件开发 API
- [ ] **插件市场**：建立插件市场，支持第三方插件
- [ ] **示例插件**：
  - 文档验证插件
  - 代码生成插件
  - 格式检查插件

#### 云端同步
- [ ] **用户账户**：支持用户注册和登录
- [ ] **云端存储**：将文档和配置同步到云端
- [ ] **跨设备同步**：在不同设备间同步工作状态
- [ ] **分享功能**：分享文档分析结果给他人

#### 协作功能
- [ ] **实时协作**：多人同时查看和编辑同一文档
- [ ] **评论标注**：在文档上添加评论和标注
- [ ] **团队空间**：创建团队工作空间，管理共享文档

### 第四阶段：专业版功能（未来）

#### 高级分析
- [ ] **AI 辅助分析**：利用 AI 技术分析文档结构和内容
- [ ] **智能修复**：自动检测并修复损坏的文档
- [ ] **格式转换向导**：引导式的高级格式转换
- [ ] **批量处理**：批量处理多个文档

#### 企业功能
- [ ] **企业部署**：支持企业内网部署
- [ ] **权限管理**：细粒度的权限控制
- [ ] **审计日志**：记录所有操作日志
- [ ] **API 访问**：提供 RESTful API 供系统集成

#### 文档中心
- [ ] **文档库管理**：集中管理大量 Office 文档
- [ ] **全文搜索**：在文档库中进行全文搜索
- [ ] **标签系统**：为文档添加标签和分类
- [ ] **工作流集成**：与现有的办公工作流集成

### 技术债务清理

- [ ] **测试覆盖**：添加单元测试和集成测试
- [ ] **类型安全**：提高 TypeScript 类型覆盖率
- [ ] **错误处理**：完善错误处理和用户提示
- [ ] **无障碍访问**：改进无障碍访问支持
- [ ] **国际化**：支持多语言界面

### 平台扩展

- [ ] **移动端**：开发 iOS 和 Android 移动应用
- [ ] **Web 版本**：提供纯 Web 版本（无需安装）
- [ ] **命令行工具**：提供 CLI 版本供自动化使用
- [ ] **VS Code 插件**：开发 VS Code 插件，在编辑器中查看 OpenXML 结构

---

## 社区

- **问题反馈**：[GitHub Issues](https://github.com/your-username/OpenXML-Inspector/issues)
- **功能建议**：[GitHub Discussions](https://github.com/your-username/OpenXML-Inspector/discussions)
- **更新日志**：[CHANGELOG.md](CHANGELOG.md)（待创建）

---

**感谢使用 OpenXML Inspector！**

如果你觉得这个工具有帮助，请考虑给它一个 Star ⭐
