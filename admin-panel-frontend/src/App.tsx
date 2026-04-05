import { useState } from 'react'
import createClient from 'openapi-fetch'
import type { paths } from './types/api'

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
})

const MAX_LENGTH = 2000

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function App() {
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isValid = content.trim().length > 0 && content.length <= MAX_LENGTH
  const isLoading = status === 'loading'

  const handleSend = async () => {
    if (!isValid || isLoading) return

    setStatus('loading')
    setErrorMessage('')

    const { error, response } = await client.POST('/messages', {
      body: { content },
    })

    if (error || response.status !== 201) {
      const msg = (error as { message?: string })?.message ?? 'Ошибка при отправке'
      setStatus('error')
      setErrorMessage(msg)
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('success')
    setContent('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
      <main className="min-h-svh flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">

          <div>
            <h1 className="text-lg font-semibold">Информационный киоск</h1>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <label htmlFor="message" className="text-gray-600">Сообщение</label>
              <span className={content.length > MAX_LENGTH ? 'text-red-500' : 'text-gray-400'}>
              {content.length} / {MAX_LENGTH}
            </span>
            </div>
            <textarea
                id="message"
                rows={6}
                value={content}
                onChange={e => setContent(e.target.value.trimStart())}
                onBlur={e => setContent(e.target.value.trim())}
                disabled={isLoading}
                placeholder="Введите сообщение..."
                className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none outline-none focus:border-gray-400 disabled:opacity-50"
            />
          </div>

          {status === 'success' && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                Сообщение успешно отправлено
              </p>
          )}

          {status === 'error' && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {errorMessage}
              </p>
          )}

          <button
              onClick={handleSend}
              disabled={!isValid || isLoading}
              className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-30 transition-colors"
          >
            {isLoading ? 'Отправка...' : 'Отправить на монитор'}
          </button>

        </div>
      </main>
  )
}