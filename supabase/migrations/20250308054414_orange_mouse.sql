/*
  # Create Dictionary Table

  1. New Tables
    - `dictionary_entries`
      - `id` (uuid, primary key)
      - `word` (text, the dialect word)
      - `translation` (text, literary Serbian translation)
      - `description` (text, optional description)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `dictionary_entries` table
    - Add policies for CRUD operations
*/

CREATE TABLE dictionary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  translation text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE dictionary_entries ENABLE ROW LEVEL SECURITY;

-- Allow users to read all entries
CREATE POLICY "Anyone can view dictionary entries"
  ON dictionary_entries
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to insert their own entries
CREATE POLICY "Users can create entries"
  ON dictionary_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own entries
CREATE POLICY "Users can update own entries"
  ON dictionary_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own entries
CREATE POLICY "Users can delete own entries"
  ON dictionary_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);