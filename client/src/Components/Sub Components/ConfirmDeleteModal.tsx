interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-[1px]">
      <div className="w-[min(520px,92vw)] rounded-xl border card-surface shadow-2xl">
        <div className="flex items-center justify-between border-b p-4 card-surface">
          <h3 className="m-0 text-lg font-semibold card-heading">
            Delete this contact? This cannot be undone.
          </h3>
          <button
            aria-label="Close"
            onClick={onCancel}
            className="rounded-full p-1 text-2xl leading-none text-slate-600 hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="flex justify-end gap-2 p-4">
          <button
            onClick={onCancel}
            className="rounded-lg border bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg border border-red-600 bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Sure
          </button>
        </div>
      </div>
    </div>
  );
}
