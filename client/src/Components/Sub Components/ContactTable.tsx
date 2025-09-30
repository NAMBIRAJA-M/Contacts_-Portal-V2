import type { Contact } from "../../types/contact";

interface ContactTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactTable({ contacts, onEdit, onDelete }: ContactTableProps) {
  if (contacts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-3 shadow-sm table-surface">
        <div className="py-8 text-center text-sm text-slate-600">Search Is Not Found 🤷‍♀️</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-3 shadow-sm table-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-100 table-head-row">
              {["Name", "Company", "Email", "Phone", "Notes", "Added", "Actions"].map((header) => (
                <th key={header} className="px-3 py-2 text-left font-bold text-slate-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-slate-200 odd:bg-white even:bg-slate-50">
                <td className="px-3 py-2">{contact.name}</td>
                <td className="px-3 py-2">{contact.company}</td>
                <td className="px-3 py-2">{contact.email}</td>
                <td className="px-3 py-2">{contact.phone}</td>
                <td className="px-3 py-2">{contact.notes}</td>
                <td className="px-3 py-2">{contact.createdAt}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(contact)}
                      className="rounded-lg border bg-white px-3 py-1.5 text-slate-900 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
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
    </div>
  );
}
