import React from "react";

export default function Button({
  onClick = () => {},
  icon = "",
  text = "Button",
  className = "",
  color = "default",
}) {
  return (
    <button
      className={`flex items-center justify-between px-3 py-2 transition-colors border border-current rounded-lg group focus:outline-none focus:ring ${stateColors[color]} ${className}`}
      onClick={onClick}
    >
      <span
        className={`font-medium transition-colors group-hover:text-white`}
      >
        {text}
      </span>

      {icon.length > 0 && (
        <span className="flex-shrink-0 rounded group-hover:text-white sm:bg-white group-hover:sm:text-current">
          <i className="w-1 h-1 p-1" style={{ fontStyle: "normal" }}>
            {icon}
          </i>
        </span>
      )}
    </button>
  );
}

const stateColors = {
  success: "text-emerald-600 hover:bg-emerald-600",
  default: "text-slate-900 hover:bg-slate-900",
  danger: "text-rose-600 hover:bg-rose-600"
};
