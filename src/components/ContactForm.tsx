import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Informe seu nome';
    if (!form.email.trim()) e.email = 'Informe seu e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido';
    if (!form.subject.trim()) e.subject = 'Informe o assunto';
    if (!form.message.trim()) e.message = 'Escreva sua mensagem';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject,
        message: form.message,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3>Mensagem enviada!</h3>
        <p>Obrigado pelo contato. Nossa equipe responderá em breve.</p>
        <button onClick={() => setStatus('idle')} className="btn-back">Enviar outra mensagem</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div className="form-error-banner">
          Erro ao enviar mensagem. Tente novamente ou ligue para (11) 4000-0000.
        </div>
      )}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nome completo *</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            className={errors.name ? 'input-error' : ''}
            placeholder="Seu nome"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            className={errors.email ? 'input-error' : ''}
            placeholder="seu@email.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Assunto *</label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={e => update('subject', e.target.value)}
            className={errors.subject ? 'input-error' : ''}
            placeholder="Sobre o que deseja falar?"
          />
          {errors.subject && <span className="error-text">{errors.subject}</span>}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Mensagem *</label>
        <textarea
          id="message"
          rows={6}
          value={form.message}
          onChange={e => update('message', e.target.value)}
          className={errors.message ? 'input-error' : ''}
          placeholder="Escreva sua mensagem..."
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>
      <button type="submit" className="submit-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
