<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToTodoList() {
  router.push('/todo')
}
</script>

<template>
  <main>
    <div class="container">
      <header>
        <h1>福格行为模型 (Fogg Behavior Model)</h1>
        <div class="formula-box">
          行为 (B) = 动机 (M) × 能力 (A) × 提示 (P)
        </div>
      </header>

      <div class="components">
        <div class="component-card a-card">
          <h3>A: 能力 (Ability)</h3>
          <p>做某事的<strong>容易程度</strong>。时间、金钱、体力、脑力消耗越低，A越高。</p>
          <p>🎯 <strong>项目核心：</strong> MicroSteps 通过 AI 拆解任务，<strong>直接最大化 A</strong>，是我们的创新点。</p>
        </div>
        <div class="component-card m-card">
          <h3>M: 动机 (Motivation)</h3>
          <p>做某事的<strong>内在驱动力</strong>。高动机意味着高意愿，但M不稳定且难以控制。</p>
          <p>💡 <strong>项目应用：</strong> 成功的即时"庆祝"，间接维持 M 的水平。</p>
        </div>
        <div class="component-card p-card">
          <h3>P: 提示 (Prompt)</h3>
          <p>触发行动的<strong>信号</strong>。必须在 M 和 A 足够高时出现，P才有效。</p>
          <p>🔔 <strong>项目规划：</strong> 在未来版本中，我们将利用 AI 分析用户的日常习惯，自动识别最佳的<strong>“锚点”</strong>（例如“喝完咖啡后”），从而发送<strong>情境化提示</strong>，提高行为的触发成功率。</p>
        </div>
      </div>

      <div class="chart-section">
        <div class="chart-title">
          行为发生曲线图：MicroSteps 的作用
        </div>
        <div class="fogg-chart-wrapper">
          
          <div class="fogg-chart">
            <span class="action-line-text">行动线</span>

            <span class="zone-label zone-fail">失败区</span>
            <span class="zone-label zone-success">成功区</span>

            <div class="project-point" title="我们的目标：即使在低动机下，也能通过高能力实现行为。"></div>
            <span class="project-point-label">→ 你的微步骤位置</span>
          </div>

          <div class="chart-description">
            <h3>MicroSteps 如何保证成功？</h3>
            <p>当用户输入一个目标时，他们的点通常落在左下方（低能力，低动机）。</p>
            <p>我们的 LLM 算法通过递归拆解，将任务难度（A）推向图表的<strong>顶部</strong>，即使动机（M）很低，也能轻松跨越行动线。</p>
            <p>✅ <strong>行为发生的秘诀：</strong></p>
            <p class="success-formula">低动机 + 高能力 = 行为发生！</p>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <button @click="goToTodoList" class="start-button">开始使用 MicroSteps</button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

/* 定义CSS变量 */
:root {
  --color-primary: #2563eb; /* 科技蓝 */
  --color-secondary: #f97316; /* 警示橙，用于"太难了"按钮 */
  --color-success: #10b981; /* 成功绿 */
  --color-bg: #f9fafb; /* 浅背景 */
  --color-text-dark: #1f2937;
  --color-text-light: #6b7280;
}

main {
  @include flex-center;
  flex-direction: column;
  min-height: 100vh;
  padding: $spacing-xl;
  background-color: var(--color-bg);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 */
header {
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: var(--color-text-dark);
    margin-bottom: 20px;
    font-weight: 700;
  }
}

.formula-box {
  display: inline-block;
  background-color: #1d4ed8; /* 更深的蓝色 */
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 核心三要素 */
.components {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-top: 40px;
}

.component-card {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.component-card h3 {
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 700;
}

.m-card { 
  background-color: rgba(255, 237, 200, 0.8); /* 提高饱和度 */
  border: 2px solid var(--color-secondary); 
}
.a-card { 
  background-color: rgba(200, 220, 255, 0.8); /* 提高饱和度 */
  border: 2px solid var(--color-primary); 
}
.p-card { 
  background-color: rgba(200, 255, 230, 0.8); /* 提高饱和度 */
  border: 2px solid var(--color-success); 
}

.m-card h3 { color: var(--color-secondary); }
.a-card h3 { color: var(--color-primary); }
.p-card h3 { color: var(--color-success); }

.component-card p {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

/* 行为曲线图简化版 */
.chart-section {
  margin-top: 60px;
  border-top: 1px solid #e5e7eb;
  padding-top: 40px;
}

.chart-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 30px;
  font-weight: 600;
  color: var(--color-text-dark);
}

.fogg-chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

/* 1. 图表主体 */
.fogg-chart {
  width: 450px;
  height: 350px;
  background: linear-gradient(135deg, rgba(255, 100, 100, 0.1) 50%, rgba(16, 185, 129, 0.15) 50%);
  border-left: 3px solid black;
  border-bottom: 3px solid black;
  position: relative;
}

/* 2. 坐标轴标签 */
.fogg-chart::before {
  content: '能力 (Ability: 高 →)';
  position: absolute;
  bottom: 360px;
  left: 0;
  font-weight: 700;
  color: var(--color-primary);
}
.fogg-chart::after {
  content: '动机 (Motivation: 低 → 高)';
  position: absolute;
  bottom: -30px;
  right: 0;
  font-weight: 700;
  color: var(--color-secondary);
}

/* 3. 行动线 (对角线) */
.action-line-text {
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 800;
  color: var(--color-success);
}

/* 4. 区域标签 */
.zone-label {
  position: absolute;
  font-size: 1.5rem;
  font-weight: 800;
}
.zone-fail {
  bottom: 50px;
  left: 50px;
  color: #ef4444; /* 红色 */
}
.zone-success {
  top: 50px;
  right: 50px;
  color: var(--color-success);
}

/* 5. 你的项目目标点 */
.project-point {
  position: absolute;
  /* 位于高能力区，中低动机区 */
  top: 50px; 
  left: 150px; 
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-primary);
  border: 3px solid white;
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.8);
  z-index: 10;
}
.project-point-label {
  position: absolute;
  top: 50px;
  left: 180px;
  font-weight: 700;
  white-space: nowrap;
  color: var(--color-text-dark);
}

/* 描述区 */
.chart-description {
  max-width: 450px;
  text-align: left;
}
.chart-description h3 {
  color: var(--color-text-dark);
  margin-top: 0;
}
.chart-description p {
  margin-bottom: 15px;
  color: var(--color-text-light);
  line-height: 1.6;
}

.success-formula {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* CTA按钮 */
.cta-section {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  
  .start-button {
    @include button-style(var(--color-primary), white);
    padding: 12px 30px;
    font-size: 1.1rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    background-color:#1d4ed8; /* 直接展示为蓝色 */
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .components {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .fogg-chart-wrapper {
    flex-direction: column;
  }
  
  .fogg-chart {
    width: 100%;
    max-width: 350px;
    height: 300px;
  }
  
  .chart-description {
    max-width: 100%;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  .formula-box {
    font-size: 1rem;
    padding: 12px 20px;
  }
}
</style>