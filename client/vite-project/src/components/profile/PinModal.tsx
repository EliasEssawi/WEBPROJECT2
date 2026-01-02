import React, { useRef } from "react";

type PinModalProps = {
  profileName: string;
  pinInputs: string[];
  pinError: boolean;
  onChange: (value: string, idx: number) => void;
  onBackspace: (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const PinModal: React.FC<PinModalProps> = ({
  profileName,
  pinInputs,
  pinError,
  onChange,
  onBackspace,
  onSubmit,
  onClose,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return;

    onChange(value, idx);

    // move automatically to next input
    if (value && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !pinInputs[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }

    onBackspace(idx, e);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{profileName}&apos;s PIN</h2>

        {pinError && <p className="error">Wrong PIN</p>}

        <div className="pin-row">
          {pinInputs.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              maxLength={1}
              value={val}
              inputMode="numeric"
              autoFocus={idx === 0}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
            />
          ))}
        </div>

        <button onClick={onSubmit}>Continue</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PinModal;
