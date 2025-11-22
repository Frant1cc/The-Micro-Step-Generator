import type { ChatMessage } from './api/deepseek'

export const systemMicroSteps: string =
  '你是一位世界顶尖的行为设计专家，精通 BJ Fogg 的行为模型（B=M A P），尤其擅长通过将任务难度（Ability, A）降至最低来确保行为发生。你的任务是将用户提供的目标拆解为 3-5 个\'微步骤\'。请严格遵守以下规则：\n1. 所有步骤必须旨在极大降低行为门槛（A）。\n2. 每个步骤都必须简单到可在 2 分钟内完成，侧重于启动动作而非完成。例如：第一步必须是\'打开文件\'或\'穿上鞋\'，而不是\'写完第一章\'。\n3. 请为每个步骤提供一个简短的解释，说明它如何降低了门槛。\n4. 用户的目标是实现一个正向的行为（B）。\n5. 严格以 JSON 格式输出，内容为包含 \'step\' 和 \'description\' 字段的数组，不包含任何其他文字或解释。'

export const responseFormatMicroSteps = {
  type: 'json_object',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        step: { type: 'string', description: '具体的微小行动，不超过10个字。' },
        description: {
          type: 'string',
          description: '解释这个微步骤如何降低难度。',
        },
      },
      required: ['step', 'description'],
    },
  },
}

export function microStepsMessages(goal: string): ChatMessage[] {
  return [
    { role: 'system', content: systemMicroSteps },
    {
      role: 'user',
      content: `请将我的目标拆解为微步骤：\n目标是：${goal}`,
    },
  ]
}

export function simplifyStepMessages(step: string): ChatMessage[] {
  return [
    { role: 'system', content: systemNanoSteps },
    {
      role: 'user',
      content: `当前步骤偏难：${step}\n请进一步细化为更简单的微步骤（3条）。`,
    },
  ]
}

export const Prompts = {
  microStepsMessages,
  simplifyStepMessages,
  responseFormatMicroSteps,
}

export const systemNanoSteps: string =
  '你是一位专注于极简行为拆解的专家。你的任务是将用户提供的、已经很微小的步骤，再次拆解为 3 个更简单、更原子化的\'纳米步骤\'。请再次评估这个行为，将其难度降至绝对最低。对于每个步骤：\n1. "step" 字段应该是具体的操作步骤，如"打开记事本"、"写下标题"\n2. "description" 字段应该解释说明这个步骤的作用或意义\n请严格以 JSON 格式输出，内容为包含 \'step\' 和 \'description\' 字段的数组，不包含任何其他文字或解释。'

export const responseFormatNanoSteps = {
  type: 'json_object',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        step: { type: 'string', description: '具体的步骤，不超过10个字。' },
        description: {
          type: 'string',
          description: '解释说明这个步骤。',
        },
      },
      required: ['step', 'description'],
    },
  },
}

export function nanoStepsMessages(step: string): ChatMessage[] {
  return [
    { role: 'system', content: systemNanoSteps },
    {
      role: 'user',
      content: `原步骤是：${step}\n请将这个步骤拆解为更简单的具体步骤，每步都要包含具体的操作和解释说明。`,
    },
  ]
}

export const NanoPrompts = {
  nanoStepsMessages,
  responseFormatNanoSteps,
}