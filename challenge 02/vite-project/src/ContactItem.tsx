import type { Contact } from './types';

interface Props {
  contact: Contact;
  onDelete: (id: number) => void;
}

function ContactItem({ contact, onDelete }: Props) {
  return (
    <li className="contact-item">
      <div className="contact-info">
        <strong>{contact.name}</strong>
        <span>{contact.phone}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(contact.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default ContactItem;
