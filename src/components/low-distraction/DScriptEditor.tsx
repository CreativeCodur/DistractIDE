import React, { useRef, useEffect } from 'react';
import { validateDScriptInput } from '../../utils/security';

interface DScriptEditorProps {
  value: string;
  onChange: (value: string) => void;
  errors: string[];
  disabled?: boolean;
}

const DScriptEditor: React.FC<DScriptEditorProps> = ({
  value,
  onChange,
  errors,
  disabled = false
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Update line numbers when value changes
  useEffect(() => {
    if (lineNumbersRef.current) {
      const lineCount = value.split('\n').length;
      const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)
        .map(num => `<div class="line-number">${num}</div>`)
        .join('');

      lineNumbersRef.current.innerHTML = lineNumbers;
    }
  }, [value]);

  // Handle textarea input
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Validate input to ensure it only contains allowed characters
    if (!validateDScriptInput(newValue) && newValue.trim() !== '') {
      // If invalid input, don't update the value
      return;
    }

    // Ensure max 10 lines
    const lines = newValue.split('\n');
    if (lines.length <= 10) {
      onChange(newValue);
    } else {
      // If more than 10 lines, truncate
      onChange(lines.slice(0, 10).join('\n'));
    }
  };

  // Handle tab key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // Insert tab at cursor position
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      // Move cursor after the inserted tab
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Check if a line has an error
  const hasLineError = (lineNumber: number): boolean => {
    return errors.some(error => error.includes(`Line ${lineNumber}:`));
  };

  return (
    <div className="relative font-mono text-sm border border-light-400/30 dark:border-dark-400/30 rounded-lg overflow-hidden">
      <div className="flex">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="line-numbers py-2 px-2 text-right bg-light-300/50 dark:bg-dark-400/50 text-light-600 dark:text-dark-300 select-none"
          style={{ minWidth: '2rem' }}
        />

        {/* Editor */}
        <textarea
          ref={editorRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 bg-light-200/50 dark:bg-dark-500/50 outline-none resize-none min-h-[240px]"
          spellCheck="false"
          disabled={disabled}
        />

        {/* Error indicators */}
        <div className="absolute left-0 top-0 pointer-events-none">
          {value.split('\n').map((_, index) => (
            hasLineError(index + 1) && (
              <div
                key={index}
                className="error-indicator"
                style={{
                  position: 'absolute',
                  left: '0.5rem',
                  top: `calc(${index} * 1.5rem + 0.75rem)`,
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.8)'
                }}
              />
            )
          ))}
        </div>
      </div>

      {/* Syntax highlighting would go here in a more complex implementation */}
    </div>
  );
};

export default DScriptEditor;
