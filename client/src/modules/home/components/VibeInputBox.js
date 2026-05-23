import { useState } from 'react';

function VibeInputBox() {
  const [value, setValue] = useState('');

  return (
    <div className="vibe-input-wrapper mx-auto">
      <div className="vibe-input-glow" aria-hidden="true" />
      <div className="vibe-input-box">
        <label htmlFor="vibe-command" className="visually-hidden">
          Ask the LMS assistant
        </label>
        <textarea
          id="vibe-command"
          className="vibe-input-box__textarea"
          rows={2}
          placeholder="Describe what you want to learn today..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="vibe-input-box__bar">
          <button type="button" className="vibe-input-box__utility" aria-label="Attach file">
            📎
          </button>
          <button type="button" className="vibe-input-box__send" aria-label="Send prompt">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default VibeInputBox;
