import type { Contact } from "../../types/contact";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="rounded-xl border card-surface p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700">
            {getInitials(contact.name)}
          </div>
          <div>
            <div className="text-sm font-bold card-heading">{contact.name}</div>
            <div className="text-sm text-slate-600">{contact.company}</div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(contact)}
            title="Edit"
            className="rounded-lg p-1.5 action-icon"
          >
            <img src="/edit.png" className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
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
          <a className="text-blue-600" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <img className="h-5 w-5" src="/phone.png" />
          <a className="text-slate-700" href={`tel:${contact.phone}`}>
            {contact.phone}
          </a>
        </div>
        <div className="mt-2 text-xs text-slate-500">{contact.notes}</div>
        <div className="mt-3 text-xs text-slate-400">
          Added: <img className="mr-1 inline h-4 w-4" src="/calender.png" /> {contact.createdAt}
        </div>
      </div>
    </div>
  );
}
