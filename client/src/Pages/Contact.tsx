import { useEffect, useMemo, useRef, useState } from "react";
import type { Contact, FormState, ViewMode, FormErrors, FormMode } from "../types/contact";
import { validateForm, todayISO } from "../utils/contactUtils";
import ViewToggle from "../Components/Sub Components/ViewToggle";
import ConfirmDeleteModal from "../Components/Sub Components/ConfirmDeleteModal";
import ContactFormModal from "../Components/Sub Components/ContactFormModal";
import ContactCard from "../Components/Sub Components/ContactCard";
import ContactTable from "../Components/Sub Components/ContactTable";
import ContactToolbar from "../Components/Sub Components/ContactToolbar";

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





export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("add");
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

  const searchRef = useRef<HTMLInputElement | null>(null);

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
          <h2 className="m-0 text-2xl font-semibold card-heading">Contacts</h2>
          <h4 className="m-0 text-sm card-muted">
            Store, search, and manage your network in one neat place
          </h4>
        </div>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <ContactToolbar
        searchRef={searchRef}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddContact={openAdd}
        onImport={() => console.log("Import clicked")}
        onExport={() => console.log("Export clicked")}
      />

     
      {viewMode === "cards" ? (
        filtered.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-600">Search is not found</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {filtered.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={openEdit}
                onDelete={askDelete}
              />
            ))}
          </div>
        )
      ) : (
        <ContactTable
          contacts={filtered}
          onEdit={openEdit}
          onDelete={askDelete}
        />
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
