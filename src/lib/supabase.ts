import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
};

export const CATEGORIES = [
  { slug: 'Construcao', label: 'Construção', icon: 'building' },
  { slug: 'Pintura', label: 'Pintura', icon: 'paint' },
  { slug: 'Manutencao de Equipamentos', label: 'Manutenção de Equipamentos', icon: 'wrench' },
  { slug: 'Limpeza', label: 'Limpeza', icon: 'clean' },
] as const;

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find(c => c.slug === slug)?.label ?? slug;
}

export function formatDate(dateStr: string | Date): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
