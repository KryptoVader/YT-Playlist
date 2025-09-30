import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type PlaylistHistory = {
  id: string
  playlist_id: string
  title: string
  thumbnail_url: string
  total_duration_seconds: number
  video_count: number
  created_at: string
}
