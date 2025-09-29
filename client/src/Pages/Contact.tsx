import  { useEffect, useMemo, useRef, useState } from "react";


type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt: string; 
};

type FormState = Pick<Contact, "name" | "company" | "email" | "phone" | "notes">;
type ViewMode = "cards" | "table";
type FormErrors = Partial<Record<keyof FormState, string>>;

const initialContacts: Contact[] = [
  { id: "1", name: "Aisha Varma", email: "aisha@solara.dev", phone: "+91 98765 10101", company: "Solara Labs", notes: "Prefers email.", createdAt: "2025-09-01" },
  { id: "2", name: "Rahul Mehta", email: "rahul@zenpay.in", phone: "+91 99988 77665", company: "ZenPay", notes: "CFO contact via Sanjay.", createdAt: "2025-09-10" },
  { id: "3", name: "Neha Sharma", email: "neha@pixelnest.io", phone: "+91 98000 55555", company: "PixelNest", notes: "Asked for demo next week.", createdAt: "2025-09-15" },
  { id: "4", name: "Arun Kumar", email: "arun@deltafin.com", phone: "+91 97000 44444", company: "DeltaFin", notes: "Whatsapp follow-up.", createdAt: "2025-09-17" },
  { id: "5", name: "Meera Iyer", email: "meera@brightstack.ai", phone: "+91 91234 22334", company: "BrightStack", notes: "Requested pricing sheet.", createdAt: "2025-09-18" },
  { id: "6", name: "Siddharth Rao", email: "sid@quantech.io", phone: "+91 93450 66778", company: "QuanTech", notes: "Follow-up call scheduled.", createdAt: "2025-09-19" },
  { id: "7", name: "Priya Nair", email: "priya@cloudstride.com", phone: "+91 96543 22345", company: "CloudStride", notes: "Interested in annual plan.", createdAt: "2025-09-20" },
  { id: "8", name: "Vikram Singh", email: "vikram@finlogic.in", phone: "+91 97666 88990", company: "FinLogic", notes: "Sent proposal last week.", createdAt: "2025-09-21" },
  { id: "9", name: "Anjali Gupta", email: "anjali@medinova.org", phone: "+91 98877 55661", company: "MediNova", notes: "Asked for case studies.", createdAt: "2025-09-22" },
  { id: "10", name: "Karan Patel", email: "karan@orbitworks.io", phone: "+91 97777 33445", company: "OrbitWorks", notes: "Meeting scheduled in Bangalore.", createdAt: "2025-09-23" },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const todayISO = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  return errors;
};


function ViewToggle({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
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

function ConfirmDeleteModal({
  isOpen,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
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

function ContactFormModal({
  isOpen,
  mode,
  form,
  errors,
  onChange,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  mode: "add" | "edit";
  form: FormState;
  errors: FormErrors;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
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


export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const searchRef = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd + K -> focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) => (c.name || "").toLowerCase().includes(q));
  }, [contacts, searchQuery]);

  const openAdd = () => {
    setFormMode("add");
    setEditingId(null);
    setForm({ name: "", company: "", email: "", phone: "", notes: "" });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEdit = (c: Contact) => {
    setFormMode("edit");
    setEditingId(c.id);
    setForm({
      name: c.name || "",
      company: c.company || "",
      email: c.email || "",
      phone: c.phone || "",
      notes: c.notes || "",
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormErrors({});
  };

  const onFormChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitForm = () => {
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (formMode === "edit" && editingId) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                name: form.name.trim(),
                company: form.company.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                notes: form.notes.trim(),
              }
            : c
        )
      );
      closeForm();
      return;
    }

    const newContact: Contact = {
      id: String(Date.now()),
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
      createdAt: todayISO(),
    };
    setContacts((prev) => [newContact, ...prev]);
    closeForm();
  };

  const askDelete = (id: string) => setDeleteId(id);
  const confirmDelete = () => {
    if (!deleteId) return;
    setContacts((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen p-4 page-surface">
      
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="m-0 text-2xl font-semibold text-black">Contacts</h2>
          <h4 className="m-0 text-sm text-slate-700">
            Store, search, and manage your network in one neat place
          </h4>
        </div>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

     
      <div className="sticky top-0 z-10 mb-6 flex w-[98%] items-center justify-between rounded-xl bg-slate-300/60 p-4 backdrop-blur toolbar-surface">
        <input
          ref={searchRef}
          className="h-10 w-[min(520px,90%)] rounded-lg border border-slate-400 bg-white px-3 text-black outline-none placeholder:text-slate-700 input-surface"
          type="text"
          placeholder="Search (Ctrl+K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              
              setSearchQuery((q) => q.trim());
            }
          }}
          aria-label="Search"
        />
        <div className="flex gap-3">
          <button className="rounded-lg border bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600">
            <img className="mr-2 inline h-5 w-5 align-middle" src="/import.png" />
            Import
          </button>
          <button className="rounded-lg border  bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600">
            <img className="mr-2 inline h-5 w-5 align-middle" src="/export.png" />
            Export
          </button>
          <button
            onClick={openAdd}
            className="rounded-lg border  bg-[#6E8CFB] px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            + Add Contact
          </button>
        </div>
      </div>

     
      {viewMode === "cards" ? (
        filtered.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-600">Search is not found</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {filtered.map((c) => (
              <div key={c.id} className="rounded-xl border card-surface p-4 shadow-sm">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700">
                      {getInitials(c.name)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{c.name}</div>
                      <div className="text-sm text-slate-600">{c.company}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(c)}
                      title="Edit"
                      className="rounded-lg p-1.5 hover:bg-slate-100"
                    >
                      <img src="/edit.png" className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => askDelete(c.id)}
                      title="Delete"
                      className="rounded-lg border p-1.5 hover:bg-slate-50"
                    >
                      <img src="/Frame.png" className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-sm text-slate-700">
                  <div className="mt-2 flex items-center gap-2">
                    <img className="h-5 w-5" src="/email.png" />
                    <a className="text-blue-600" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <img className="h-5 w-5" src="/phone.png" />
                    <a className="text-slate-700" href={`tel:${c.phone}`}>
                      {c.phone}
                    </a>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{c.notes}</div>
                  <div className="mt-3 text-xs text-slate-400">
                    Added: <img className="mr-1 inline h-4 w-4" src="/calender.png" /> {c.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="rounded-xl bg-white p-3 shadow-sm table-surface">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-600">Search Is Not Found 🤷‍♀️</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-100 table-head-row">
                    {["Name", "Company", "Email", "Phone", "Notes", "Added", "Actions"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left font-bold text-slate-900">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-t border-slate-200 odd:bg-white even:bg-slate-50">
                      <td className="px-3 py-2">{c.name}</td>
                      <td className="px-3 py-2">{c.company}</td>
                      <td className="px-3 py-2">{c.email}</td>
                      <td className="px-3 py-2">{c.phone}</td>
                      <td className="px-3 py-2">{c.notes}</td>
                      <td className="px-3 py-2">{c.createdAt}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(c)}
                            className="rounded-lg border bg-white px-3 py-1.5 text-slate-900 hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => askDelete(c.id)}
                            className="rounded-lg border border-red-500 bg-red-500 px-3 py-1.5 text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      
      <ContactFormModal
        isOpen={isFormOpen}
        mode={formMode}
        form={form}
        errors={formErrors}
        onChange={onFormChange}
        onClose={closeForm}
        onSubmit={submitForm}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
