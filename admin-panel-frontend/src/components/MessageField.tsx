import React from 'react';

interface Props {
    value: string;
    onChange: (val: string) => void;
    maxLength: number;
    disabled?: boolean;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const MessageField = ({ value, onChange, maxLength, disabled, onKeyDown }: Props) => {
    const charCount = value.length;
    const progress = Math.min((charCount / maxLength) * 100, 100);

    const isWarn = charCount > maxLength * 0.9;
    const isOver = charCount > maxLength;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                    Сообщение
                </label>
                <span className={`text-[12px] font-mono ${isOver ? 'text-[var(--over-color)]' : isWarn ? 'text-[var(--warn-color)]' : 'text-[var(--text-hint)]'}`}>
          {charCount} / {maxLength}
        </span>
            </div>

            <div className={`border rounded-[var(--radius-md)] overflow-hidden transition-colors focus-within:border-[var(--border-focus)] ${isOver ? 'border-[var(--over-color)]' : 'border-[var(--border)]'}`}>
        <textarea
            className="w-full p-4 bg-transparent outline-none resize-none text-[15px] leading-relaxed"
            rows={7}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={disabled}
            placeholder="Введите сообщение..."
        />
                <div className="h-[2px] bg-[var(--border)]">
                    <div
                        className={`h-full transition-all duration-150 ${isOver ? 'bg-[var(--over-color)]' : isWarn ? 'bg-[var(--warn-color)]' : 'bg-[var(--border-focus)]'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};