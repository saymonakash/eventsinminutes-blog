import { createClient } from '@supabase/supabase-js'

export default ({ $config }, inject) => {
  const supabaseUrl = $config.public.supabaseUrl
  const supabaseKey = $config.public.supabaseKey

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('@supabase/ssr: Your project\'s URL and API key are required to create a Supabase client!')
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  inject('supabase', supabase)
}