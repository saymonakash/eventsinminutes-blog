import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  // Extract Supabase URL and Key from the configuration
  const config = useRuntimeConfig()
  const { supabaseUrl, supabaseKey } = config.public

  // Validate the presence of Supabase URL and Key
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "@supabase/ssr: Your project's URL and API key are required to create a Supabase client!",
    )
  }

  // Create a Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey)
  return provide('supabase', supabase)
})
