import {useState, useEffect, useCallback} from 'react'
import createClient from 'openapi-fetch'
import type {paths} from './types/api'

const client = createClient<paths>({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1',
})

const POLL_INTERVAL_MS = 5000

type State =
    | { kind: 'empty' }
    | { kind: 'message'; content: string }
    | { kind: 'error' }

export default function App() {
    const [state, setState] = useState<State>({kind: 'empty'})

    const fetchMessage = useCallback(async () => {
        try {
            const {data, response} = await client.GET('/messages/current')

            if (response.status === 204) {
                setState({kind: 'empty'})
                return
            }

            if (!response.ok) {
                setState({kind: 'error'})
                return
            }

            if (data?.content) {
                setState({kind: 'message', content: data.content})
            }
        } catch {
            setState({kind: 'error'})
        }
    }, [])

    useEffect(() => {
        let isMounted = true
        let timeoutId: ReturnType<typeof setTimeout>

        const tick = async () => {
            await fetchMessage()
            if (isMounted) timeoutId = setTimeout(tick, POLL_INTERVAL_MS)
        }

        timeoutId = setTimeout(tick, 0)

        return () => {
            isMounted = false
            clearTimeout(timeoutId)
        }
    }, [fetchMessage])

    return (
        <main className="min-h-svh flex items-center justify-center bg-gray-50 p-8">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">

                {state.kind === 'message' ? (
                    <p className="text-black text-4xl font-medium text-center leading-snug max-w-4xl">
                        {state.content}
                    </p>
                ) : (
                    <p className="text-gray-600 text-lg">
                        {state.kind === 'error' ? 'Нет соединения с сервером' : 'Нет сообщений'}
                    </p>
                )}
            </div>
        </main>
    )
}