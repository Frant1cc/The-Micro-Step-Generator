# 🚀 MicroSteps: AI 驱动的微行为生成器
> **"Make it tiny, make it happen."** > 基于斯坦福 BJ Fogg 行为模型的动态目标拆解助手，作为TRAE黑客松的作品。

[![Vue 3](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/) [![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=flat&logo=vite)](https://vitejs.dev/) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📖 项目背景 (The Problem)

有没有遇到过这种情况：立下 Flag 说要"写完毕业论文"或者"坚持健身"，结果两天就放弃了？

根据 **斯坦福行为设计实验室创始人 BJ Fogg** 的研究，大部分人失败不是因为缺乏意志力（Motivation），而是因为**任务太难了（Low Ability）**。

当任务难度超过了当下的动机水平，行为就不会发生。

## 💡 解决方案 (The Solution)

**MicroSteps** 利用大语言模型（LLM）的语义理解能力，将宏大、模糊的目标，动态拆解为**极度简单、甚至无法拒绝**的"微步骤"。

我们通过 AI 强行降低行为门槛（Ability），让 $B=MAP$ 公式成立，帮助用户迈出最艰难的第一步。

## 🔬 核心理论 (The Science)

本项目严格遵循 **福格行为模型 (Fogg Behavior Model)**：

$$B = M \times A \times P$$

- **Behavior (行为)**：最终发生的动作。
- **Motivation (动机)**：用户想做的意愿。
- **Ability (能力)**：做这件事的容易程度。
- **Prompt (提示)**：触发行动的信号。

MicroSteps 的核心算法专注于 **最大化 Ability (让 A 趋近于无穷大)**。

## ✨ 主要功能 (Features)

- **🎯 动态拆解 (One-Shot Breakdown)**: 输入 "我要学 Python"，AI 自动生成 "打开浏览器" -> "搜索官网" 等 2 分钟内能完成的动作。
- **📉 "太难了" 按钮 (Recursive Simplification)**: 觉得当前步骤还是难？点击按钮，AI 会对单一步骤进行二次拆解，直到你觉得简单为止。
- **🎉 多巴胺反馈 (Instant Celebration)**: 每完成一步，通过视觉动效给予即时满足感，固化习惯回路。
- **🧠 状态感知 (Context Aware)**: (In Progress) 根据用户当前的精力值（累/精神）动态调整生成任务的难度。

## 🛠️ 技术栈 (Tech Stack)

- **Frontend**: Vue 3 + TypeScript + Vite
- **Styling**: SCSS
- **AI / LLM**: DeepSeek API

## ⚙️ 环境变量配置

项目需要配置以下环境变量：

```bash
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
```

## 🚀 部署说明

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

## 🗺️ 未来规划

### 短期目标
- 实现P（提示）功能，利用AI分析用户习惯
- 自动识别最佳"锚点"（如"喝完咖啡后"）
- 发送情境化提示提高行为触发成功率

### 长期愿景
- 开发移动应用版本
- 集成更多AI模型以提高拆解准确性
- 添加用户行为数据分析功能
- 实现个性化任务推荐

## 🤝 贡献指南

欢迎任何形式的贡献！如果您想参与项目开发：

1. Fork 项目仓库
2. 创建功能分支
3. 提交您的更改
4. 发起 Pull Request

## 📄 许可证

本项目采用 MIT 许可证，详情请查看 [LICENSE](LICENSE) 文件。

## 📞 联系方式

如有任何问题或建议，请通过以下方式联系我们：
- 提交 Issue
---

*MicroSteps - 让每个大目标都变得可实现*

