<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      
      <div class="modal-body">
        <p class="modal-description">{{ description }}</p>
        
        <div v-if="steps.length > 0" class="steps-list">
          <div 
            v-for="(step, index) in steps" 
            :key="index" 
            class="step-item"
            :class="{ selected: selectedSteps.includes(index) }"
            @click="toggleStepSelection(index)"
          >
            <div class="step-checkbox">
              <input 
                type="checkbox" 
                :checked="selectedSteps.includes(index)"
                @change="toggleStepSelection(index)"
              >
            </div>
            <div class="step-content">
              <p class="step-text">{{ step.step }}</p>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
        
        <div v-else class="no-steps">
          <p>暂无步骤数据</p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn-secondary" @click="closeModal">取消</button>
        <button class="btn-primary" @click="confirmSelection" :class="{ 'btn-disabled': selectedSteps.length === 0 }">
          立即开始！ ({{ selectedSteps.length }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Step {
  step: string
  description: string
}

const props = defineProps<{
  isVisible: boolean
  title?: string
  description?: string
  steps: Step[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', selectedSteps: Step[]): void
}>()

const selectedSteps = ref<number[]>([])

watch(() => props.isVisible, (newVal) => {
  if (!newVal) {
    selectedSteps.value = []
  }
})

function closeModal() {
  emit('close')
}

function toggleStepSelection(index: number) {
  const currentIndex = selectedSteps.value.indexOf(index)
  if (currentIndex === -1) {
    selectedSteps.value.push(index)
  } else {
    selectedSteps.value.splice(currentIndex, 1)
  }
}

function confirmSelection() {
  // 如果没有选中任何步骤，则不执行操作
  if (selectedSteps.value.length === 0) {
    return
  }
  
  const selected = selectedSteps.value.map(index => props.steps[index])
  emit('confirm', selected)
  closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 定义CSS变量 */
:root {
  --color-primary: #2563eb;
  --color-text-light: #6b7280;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-description {
  color: var(--color-text-light);
  margin-bottom: 20px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.step-item:hover {
  background-color: #f9fafb;
  border-color: #ddd;
}

.step-item.selected {
  background-color: #eff6ff;
  border-color: var(--color-primary);
}

.step-checkbox {
  margin-right: 15px;
  margin-top: 3px;
}

.step-checkbox input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
}

.step-content {
  flex: 1;
}

.step-text {
  font-weight: 600;
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.step-description {
  margin: 0;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.no-steps {
  text-align: center;
  padding: 30px;
  color: var(--color-text-light);
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
}

.btn-primary {
  background-color: #1d4ed8;
  color: white !important;
  opacity: 0.9;
}

.btn-primary.btn-disabled {
  background-color: var(--color-primary) !important;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

@media (max-width: 600px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
  }
  
  .modal-header h2 {
    font-size: 1.3rem;
  }
  
  .step-item {
    flex-direction: column;
  }
  
  .step-checkbox {
    margin-bottom: 10px;
  }
}
</style>