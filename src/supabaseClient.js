import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hfroriigyffeomzxxlnw.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmcm9yaWlneWZmZW9tenh4bG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxOTMzNzIsImV4cCI6MjA0ODc2OTM3Mn0.lidEEYA_yziRKQ8hZx2yfmeoq9eWqdBsBMhdNFSLOWo";

export const supabase = createClient(supabaseUrl, supabaseKey);
