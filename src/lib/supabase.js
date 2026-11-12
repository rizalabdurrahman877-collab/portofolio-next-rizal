import { createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('URL atau Key Supabase tidak ditemukan. Pastikan file .env.local sudah benar');
}

export const supabase = createClient(supabaseUrl, supabaseKey)