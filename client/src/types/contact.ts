export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAt: string;
};

export type FormState = Pick<Contact, "name" | "company" | "email" | "phone" | "notes">;

export type ViewMode = "cards" | "table";

export type FormErrors = Partial<Record<keyof FormState, string>>;

export type FormMode = "add" | "edit";
