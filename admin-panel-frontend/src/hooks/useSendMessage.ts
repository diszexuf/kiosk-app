import { useState, useCallback } from 'react';
import { client } from '../lib/api';
import type {paths} from '../types/api';

type ErrorResponse = paths["/messages"]["post"]["responses"][400]["content"]["application/json"];

export const useSendMessage = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const send = useCallback(async (messageText: string) => {
        setStatus('loading');
        setErrorMessage(null);

        const { data, error, response } = await client.POST("/messages", {
            body: {
                content: messageText,
            },
        });

        if (error) {
            const msg = (error as ErrorResponse).message || 'Ошибка сервера';
            setStatus('error');
            setErrorMessage(msg);
            return;
        }

        if (response.status === 201) {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
            return data;
        }
    }, []);

    return {
        send,
        status,
        errorMessage,
        isLoading: status === 'loading',
    };
};