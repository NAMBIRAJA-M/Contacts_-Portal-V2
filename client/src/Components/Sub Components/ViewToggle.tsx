import type { ViewMode } from "../../types/contact";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  const isCards = value === "cards";
  
  return (
    <div className="relative w-64 rounded-full bg-slate-200 p-1">
      <div
        className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#6E8CFB] transition-transform duration-200 ${
          isCards ? "translate-x-1" : "translate-x-[calc(100%-4px)]"
        }`}
      />
      <div className="relative z-10 grid grid-cols-2 gap-1">
        <button
          className={`py-2 text-center font-semibold ${
            isCards ? "text-white" : "text-black"
          }`}
          onClick={() => onChange("cards")}
        >
          Cards
        </button>
        <button
          className={`py-2 text-center font-semibold ${
            !isCards ? "text-white" : "text-black"
          }`}
          onClick={() => onChange("table")}
        >
          Table
        </button>
      </div>
    </div>
  );
}
