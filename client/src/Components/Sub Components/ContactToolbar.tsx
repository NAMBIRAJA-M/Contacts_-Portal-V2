import { RefObject } from "react";

interface ContactToolbarProps {
  searchRef: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddContact: () => void;
  onImport: () => void;
  onExport: () => void;
}

export default function ContactToolbar({
  searchRef,
  searchQuery,
  onSearchChange,
  onAddContact,
  onImport,
  onExport,
}: ContactToolbarProps) {
  return (
    <div className="sticky top-0 z-10 mb-6 flex w-[98%] items-center justify-between rounded-xl bg-slate-300/60 p-4 backdrop-blur toolbar-surface">
      <input
        ref={searchRef}
        className="h-10 w-[min(520px,90%)] rounded-lg border border-slate-400 bg-white px-3 text-black outline-none placeholder:text-slate-700 input-surface"
        type="text"
        placeholder="Search (Ctrl+K)"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchChange(searchQuery.trim());
          }
        }}
        aria-label="Search"
      />
      <div className="flex gap-3">
        <button 
          onClick={onImport}
          className="rounded-lg border bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          <img className="mr-2 inline h-5 w-5 align-middle" src="/import.png" />
          Import
        </button>
        <button 
          onClick={onExport}
          className="rounded-lg border bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          <img className="mr-2 inline h-5 w-5 align-middle" src="/export.png" />
          Export
        </button>
        <button
          onClick={onAddContact}
          className="rounded-lg border bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          + Add Contact
        </button>
      </div>
    </div>
  );
}
