import React from "react";

interface SpinnerProps {
  fullPage?: boolean;
  size?: number;
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  fullPage = false,
  size = 40,
  text = "Loading...",
}) => {
  if (fullPage) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-box">
          <div className="spinner-ring" style={{ width: size, height: size }} />
          {text && <p className="spinner-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-inline">
      <div className="spinner-ring" style={{ width: size, height: size }} />
    </div>
  );
};

export default Spinner;
