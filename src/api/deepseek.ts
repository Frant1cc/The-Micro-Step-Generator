import { API_KEY, hasApiKey } from '../env'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type ChatCompletionParams = {
  messages: ChatMessage[]
  model?: string
  temperature?: number
  top_p?: number
  max_tokens?: number
  response_format?: Record<string, any>
}

export async function deepseekChat(params: ChatCompletionParams): Promise<string> {
  if (!hasApiKey()) throw new Error('API key not configured')
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: params.model ?? 'deepseek-chat',
      messages: params.messages,
      temperature: params.temperature,
      top_p: params.top_p,
      max_tokens: params.max_tokens,
      stream: false,
      response_format: params.response_format,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    let message = `DeepSeek error ${res.status}`
    try {
      const json = JSON.parse(text)
      const msg = json?.error?.message
      const code = json?.error?.code
      message = msg ? `DeepSeek ${code ?? res.status}: ${msg}` : `DeepSeek error ${res.status}: ${text}`
    } catch {
      message = `DeepSeek error ${res.status}: ${text}`
    }
    throw new Error(message)
  }
  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content ?? ''
  return content
}