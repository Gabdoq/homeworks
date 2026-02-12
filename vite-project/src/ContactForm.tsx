import { useState } from 'react';

interface Props {
  onAdd: (name: string, phone: string) => void;
}

function ContactForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onAdd(name, phone);
      setName('');
      setPhone('');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Agregar Contacto</button>
    </form>
  );
}

export default ContactForm;
