import { useState } from 'react';
import { MessageField } from './components/MessageField';
import { StatusMessage } from './components/StatusMessage';
import {Spinner} from "./components/Spinner.tsx";
import {useSendMessage} from "./hooks/useSendMessage.ts";

const MAX_LENGTH = 2000;

export default function App() {
  const [content, setContent] = useState('');
  const { send, status, errorMessage } = useSendMessage();

  const handleSend = () => {
    if (content.trim() && content.length <= MAX_LENGTH) {
      send(content).then(() => setContent(''));
    }
  };

  return (
      <main className="min-h-svh flex items-center justify-center p-4">
        <section className="w-full max-w-[560px] bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8 flex flex-col gap-6">
          <header className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold tracking-tight">Панель управления</h1>
            </div>
            <p className="pl-12 text-sm text-[var(--text-secondary)]">Информационный киоск</p>
          </header>

          <MessageField
              value={content}
              onChange={setContent}
              maxLength={MAX_LENGTH}
              disabled={status === 'loading'}
              onKeyDown={(e) => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && handleSend()}
          />

          {status !== 'idle' && (
              <StatusMessage
                  type={status === 'error' ? 'error' : 'success'}
                  message={errorMessage || 'Сообщение отправлено'}
              />
          )}

          <button
              onClick={handleSend}
              disabled={!content.trim() || content.length > MAX_LENGTH || status === 'loading'}
              className="w-full py-3 bg-[var(--accent)] text-[var(--bg)] rounded-[var(--radius-md)] font-medium hover:opacity-90 disabled:opacity-30 transition-all flex justify-center items-center gap-2"
          >
            {status === 'loading' ? <Spinner /> : 'Отправить на монитор'}
          </button>
        </section>
      </main>
  );
}