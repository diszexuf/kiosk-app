export const StatusMessage = ({ type, message }: { type: 'success' | 'error', message: string }) => {
    const styles = type === 'success'
        ? 'bg-[var(--success-bg)] text-[var(--success-text)] border-[var(--success-border)]'
        : 'bg-[var(--error-bg)] text-[var(--error-text)] border-[var(--error-border)]';

    return (
        <div className={`flex items-center gap-2 p-3 rounded-[var(--radius-md)] border text-sm animate-in fade-in slide-in-from-top-1 ${styles}`}>
            {message}
        </div>
    );
};