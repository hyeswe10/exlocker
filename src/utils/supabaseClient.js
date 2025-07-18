import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqdcghuopbbfblrmipgd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZGNnaHVvcGJiZmJscm1pcGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NTQ4MDcsImV4cCI6MjA2ODEzMDgwN30.IEmWCu36Il2-kWwo1rkLJdzOubI2Feryt4L78hCoZhI';

export const supabase = createClient(supabaseUrl, supabaseKey);
