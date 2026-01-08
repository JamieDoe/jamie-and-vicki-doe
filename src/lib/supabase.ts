import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper type for wedding_guest table
export type WeddingGuest = Database['public']['Tables']['wedding_guest']['Row']
