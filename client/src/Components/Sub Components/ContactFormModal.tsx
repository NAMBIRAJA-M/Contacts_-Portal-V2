import type { FormState, FormErrors, FormMode } from "../../types/contact";

interface ContactFormModalProps {
  isOpen: boolean;
  mode: FormMode;
  form: FormState;
  errors: FormErrors;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ContactFormModal({
  isOpen,
  mode,
  form,
  errors,
  onChange,
  onClose,
  onSubmit,
}: ContactFormModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-[1px]">
      <div className="w-[min(560px,92vw)] rounded-xl border card-surface shadow-2xl">
        <div className="flex items-center justify-between border-b p-4 card-surface">
          <h3 className="m-0 text-lg font-semibold card-heading">
            {mode === "edit" ? "Edit Contact" : "Add New Contact"}
          </h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-1 text-2xl leading-none text-slate-600 hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-slate-600">Name</label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="Jane Doe"
              />
              {errors.name && <div className="mt-1 text-xs text-red-600">{errors.name}</div>}
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-600">Company</label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                value={form.company}
                onChange={(e) => onChange("company", e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-600">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="jane@example.com"
              />
              {errors.email && <div className="mt-1 text-xs text-red-600">{errors.email}</div>}
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-600">Phone</label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                placeholder="+91 90000 00000"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-1 block text-xs text-slate-600">Notes</label>
            <textarea
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
              value={form.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              placeholder="Optional notes"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="rounded-lg border-black-500 border-slate-700 bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              {mode === "edit" ? "Update Contact" : "Save Contact"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
