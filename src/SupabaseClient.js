import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://isniioqbkuphosivxzer.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzbmlpb3Fia3VwaG9zaXZ4emVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY2MjkzNjQsImV4cCI6MTk3MjIwNTM2NH0.Z1fah8-OBHPLoy0dBk5lz5Z0LJ0h78wruYfTyRSxBW0'
);
