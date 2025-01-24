import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hfroriigyffeomzxxlnw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmcm9yaWlneWZmZW9tenh4bG53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzE5MzM3MiwiZXhwIjoyMDQ4NzY5MzcyfQ.hGoIHaGaLyZIB5pTnmPBXdxMOTpbx0m0Z3o5IFoHfSQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
