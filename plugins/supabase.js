import { createClient } from '@supabase/supabase-js'

export default ({ $config }, inject) => {
  // Extract Supabase URL and Key from the configuration
  const { supabaseUrl, supabaseKey } = $config.public

  // Validate the presence of Supabase URL and Key
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "@supabase/ssr: Your project's URL and API key are required to create a Supabase client!"
    )
  }

  // Create a Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Inject the Supabase client into the context as $supabase
  inject('supabase', supabase)
}
