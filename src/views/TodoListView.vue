<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'
import { deepseekChat } from '../api/deepseek'
import { microStepsMessages, responseFormatMicroSteps, nanoStepsMessages, responseFormatNanoSteps } from '../prompts'
import { hasApiKey } from '../env'
import StepSelectionModal from '../components/StepSelectionModal.vue'
import confetti from 'canvas-confetti'

const newTodo = ref('')
const goal = ref('')
const loading = ref(false)
const router = useRouter()

// 弹窗相关
const isModalVisible = ref(false)
const modalTitle = ref('')
const modalDescription = ref('')
const generatedSteps = ref<{step: string, description: string}[]>([])

// 高能量反馈相关
const showCelebration = ref(false)
const celebrationMessage = ref('')
const celebrationEmoji = ref('')

// 使用store
const todoStore = useTodoStore()
const { todos, completedTodos, activeTodos, totalTodos, completedCount } = storeToRefs(todoStore)

function addTodo() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

function removeTodo(id: string) {
  console.log('Removing todo with id:', id)
  todoStore.removeTodo(id)
}

function toggleTodo(id: string) {
  todoStore.toggleTodo(id)
}

function clearCompleted() {
  todoStore.clearCompleted()
}

function goHome() {
  router.push('/')
}

// AI 微步骤生成功能
async function send() {
  if (!hasApiKey()) {
    console.error('API key not configured')
    return
  }
  if (!goal.value.trim()) {
    console.error('请输入内容')
    return
  }
  loading.value = true
  try {
    const text = await deepseekChat({ messages: microStepsMessages(goal.value), response_format: responseFormatMicroSteps })
    // 解析返回的JSON数据
    const steps = JSON.parse(text)
    // 显示弹窗
    showModal('🎉 AI 拆解完成！', '请选择您想要开始的步骤：', steps)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function simplify() {
  if (!hasApiKey()) {
    console.error('API key not configured')
    return
  }
  if (!goal.value.trim()) {
    console.error('请输入内容')
    return
  }
  loading.value = true
  try {
    const text = await deepseekChat({ messages: nanoStepsMessages(goal.value), response_format: responseFormatNanoSteps })
    // 解析返回的JSON数据
    const steps = JSON.parse(text)
    // 显示弹窗
    showModal('简化后的步骤', '以下是为您进一步简化的步骤，请选择您想要添加到待办事项中的步骤：', steps)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function simplifyTodo(todoText: string) {
  if (!hasApiKey()) {
    console.error('API key not configured')
    return
  }
  if (!todoText.trim()) {
    console.error('任务内容为空')
    return
  }
  loading.value = true
  try {
    const text = await deepseekChat({ messages: nanoStepsMessages(todoText), response_format: responseFormatNanoSteps })
    // 解析返回的JSON数据
    const steps = JSON.parse(text)
    // 显示弹窗
    showModal('简化后的步骤', '以下是为您进一步简化的步骤，请选择您想要添加到待办事项中的步骤：', steps)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 弹窗相关函数
function showModal(title: string, description: string, steps: {step: string, description: string}[]) {
  modalTitle.value = title
  modalDescription.value = description
  generatedSteps.value = steps
  isModalVisible.value = true
}

function closeModal() {
  isModalVisible.value = false
  generatedSteps.value = []
}

function addSelectedSteps(steps: {step: string, description: string}[]) {
  steps.forEach(step => {
    todoStore.addTodo(step.step)
  })
  closeModal()
}

function triggerConfetti(id: string) {
  // 获取当前任务卡片的位置
  const cardElement = document.querySelector(`[data-todo-id="${id}"]`);
  if (cardElement) {
    const rect = cardElement.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // 创建更明显的全局纸屑效果
    confetti({
      particleCount: 150, // 增加粒子数量
      angle: 90,
      spread: 120, // 扩大扩散范围
      startVelocity: 35, // 增加初始速度
      decay: 0.9,
      gravity: 1.5,
      ticks: 300, // 延长显示时间
      origin: { x: x, y: y - 0.1 }, // 稍微向上一点的位置开始
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff7700'], // 更鲜艳的颜色
      shapes: ['circle', 'square'], // 添加不同形状
      scalar: 1.2, // 增大纸屑尺寸
      zIndex: 10000,
    });
    
    // 1.5秒后停止纸屑效果
    setTimeout(() => {
      confetti.reset();
    }, 1500);
  }
  
  // 显示高能量反馈
  const celebrations = [
    { message: '太棒了！你又完成了一个步骤！', emoji: '🎉' },
    { message: '干得漂亮！继续保持！', emoji: '👏' },
    { message: '优秀！你正在朝着目标迈进！', emoji: '🚀' },
    { message: '做得好！每一步都很重要！', emoji: '💪' },
    { message: '恭喜！你离成功更近了一步！', emoji: '🌟' }
  ];
  
  const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
  celebrationMessage.value = randomCelebration.message;
  celebrationEmoji.value = randomCelebration.emoji;
  showCelebration.value = true;
  
  // 1.5秒后隐藏反馈
  setTimeout(() => {
    showCelebration.value = false;
  }, 1500);
}
</script>

<template>
  <div class="container">
    <!-- 高能量反馈弹窗 -->
    <div v-if="showCelebration" class="celebration-popup">
      <div class="celebration-content">
        <span class="celebration-emoji">{{ celebrationEmoji }}</span>
        <p class="celebration-message">{{ celebrationMessage }}</p>
      </div>
    </div>
    
    <header>
      <h1>🚀 MicroSteps</h1>
      <p class="subtitle">AI 驱动的微行为生成器：让大目标变得无法拒绝。</p>
    </header>

    <div class="input-group">
      <input 
        type="text" 
        class="input-field" 
        placeholder="输入一个你总想做但从未做成的大目标..."
        v-model="goal"
      >
      <button 
        class="btn-primary" 
        :class="{ 'btn-primary-active': goal.trim() }"
        :disabled="loading" 
        @click="send"
      >
        拆解目标 (B=MAP!)
      </button>
    </div>

    <!-- Loading指示器 -->
    <div v-if="loading" class="loading-indicator">
      <div class="spinner"></div>
      <p>🧠 AI正在思考中，请稍候...</p>
    </div>

    <div class="task-list">
      <h2>待办微步骤</h2>
      
      <TransitionGroup 
        name="task-list"
        tag="div"
        class="task-list"
      >
        <div 
          v-for="todo in todos" 
          :key="todo.id" 
          class="task-card"
          :class="{ 'completed': todo.completed }"
          :data-todo-id="todo.id"
        >
          <div class="checkbox-area">
            <input 
              type="checkbox" 
              :checked="todo.completed"
              @change="(event) => { if (event.target.checked) { toggleTodo(todo.id); triggerConfetti(todo.id) } else { toggleTodo(todo.id) } }"
              style="width: 20px; height: 20px; accent-color: var(--color-primary);"
            >
          </div>
          <div class="task-content">
            <p class="task-step" :class="{ 'completed-text': todo.completed }">{{ todo.text }}</p>
          </div>
          <button 
            v-if="!todo.completed"
            class="btn-secondary" 
            @click="simplifyTodo(todo.text)"
          >
            📉 太难了
          </button>
          <button 
            v-else
            class="btn-remove" 
            @click="removeTodo(todo.id)"
          >
            🗑️ 移除
          </button>
        </div>
      </TransitionGroup>
    </div>
    
    <!-- 步骤选择弹窗 -->
    <StepSelectionModal
      :is-visible="isModalVisible"
      :title="modalTitle"
      :description="modalDescription"
      :steps="generatedSteps"
      @close="closeModal"
      @confirm="addSelectedSteps"
    />
  </div>
</template>

<style scoped>
/* CSS 基础重置和变量定义，模拟 Tailwind 风格 */
:root {
  --color-primary: #2563eb;    /* 科技蓝: blue-600 */
  --color-secondary: #f97316;  /* 警示橙: orange-600 (用于"太难了"按钮) */
  --color-bg: #f9fafb;         /* 浅背景: gray-50 */
  --color-text-dark: #1f2937;
  --color-text-light: #6b7280;
  /* 弹窗样式变量 */
  --modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --modal-bg: white;
  --modal-border-radius: 12px;
  --modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-dark);
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

/* --- 顶部输入区 --- */
header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.625rem;
  font-weight: 800; /* Extra bold */
  color: #2563eb;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--color-text-light);
  font-size: 1.125rem;
  opacity: 0.7;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}

.input-field {
  flex-grow: 1;
  padding: 14px 20px;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.btn-remove {
  background-color: #ef4444; /* red-500 */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-remove:hover {
  background-color: #dc2626; /* red-600 */
}



.btn-primary {
  background-color: #e5e7eb; /* gray-200 as default */
  color: #6b7280; /* gray-500 */
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-primary-active {
  background-color: #2563eb;
  color: white;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-secondary:hover {
  background-color: #ea580c; /* orange-700 */
}

.btn-remove {
  background-color: #ef4444; /* red-500 */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-remove:hover {
  background-color: #dc2626; /* red-600 */
}

/* --- 任务列表 --- */
.task-list {
  display: grid;
  gap: 16px;
}

.task-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-card.completed {
  opacity: 0.7;
  background-color: #f9fafb;
}

.task-content {
  flex-grow: 1;
}

.task-step {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text-dark);
}

.task-step.completed-text {
  text-decoration: line-through;
  color: var(--color-text-light);
}

.checkbox-area {
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list h2 {
  color: var(--color-text-dark);
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 16px;
}

/* 任务列表动画 */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 300ms ease-out;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.task-list-move {
  transition: transform 300ms ease-out;
}

.task-card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: flex-start;
  transition: all 300ms ease-out;
}
.task-card:hover {
  transform: translateY(-2px);
}

.checkbox-area {
  flex-shrink: 0;
  margin-right: 16px;
  margin-top: 4px; /* 略微向下对齐 */
}

.task-content {
  flex-grow: 1;
}

.task-step {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 4px;
}



.btn-secondary {
  flex-shrink: 0;
  margin-left: 16px;
  background-color: #fff7ed; /* orange-50 background */
  color: var(--color-secondary);
  border: 1px solid #f97316; /* 更明显的橙色边框 */
  padding: 8px 16px;
  border-radius: 9999px; /* Full rounded */
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-secondary:hover {
  background-color: #fed7aa; /* orange-200 */
}



/* 高能量反馈弹窗 */
.celebration-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.celebration-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: popIn 0.3s ease-out;
  max-width: 90%;
}

.celebration-emoji {
  font-size: 3rem;
  display: block;
  margin-bottom: 15px;
}

.celebration-message {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

/* Loading指示器 */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  background-color: #eff6ff; /* blue-50 */
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #dbeafe; /* blue-100 */
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #bfdbfe; /* blue-200 */
  border-top: 3px solid #2563eb; /* blue-600 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-indicator p {
  margin: 0;
  font-weight: 600;
  color: #2563eb; /* blue-600 */
}

/* 模拟移动端响应 */
@media (max-width: 600px) {
  .container {
    margin: 20px auto;
  }
  .input-group {
    flex-direction: column;
  }
  .btn-primary {
    width: 100%;
  }
  .task-card {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-secondary {
    margin-top: 10px;
    margin-left: 0;
  }
}
</style>