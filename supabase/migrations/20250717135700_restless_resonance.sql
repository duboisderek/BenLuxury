/*
  # Initial Schema for BenLuxuryAgency Real Estate Platform

  1. New Tables
     - `projects`
       - `id` (uuid, primary key)
       - `project_name` (text)
       - `city` (text)
       - `slug` (text, unique)
       - `short_description_en` (text)
       - `long_description_en` (text)
       - `images` (text array)
       - `map_embed_url` (text)
       - `pdf_url` (text)
       - `units` (jsonb)
       - `created_at` (timestamp)
     
     - `clients`
       - `id` (uuid, primary key)
       - `full_name` (text)
       - `email` (text)
       - `phone` (text)
       - `language` (text)
       - `project_selected` (text)
       - `message` (text)
       - `status` (text)
       - `created_at` (timestamp)
     
     - `comments`
       - `id` (uuid, primary key)
       - `client_id` (uuid, foreign key)
       - `author` (text)
       - `comment_text` (text)
       - `created_at` (timestamp)
     
     - `appointments`
       - `id` (uuid, primary key)
       - `client_id` (uuid, foreign key)
       - `date` (date)
       - `time` (time)
       - `type` (text)
       - `location` (text)
       - `notes` (text)
       - `created_at` (timestamp)

  2. Security
     - Enable RLS on all tables
     - Add policies for authenticated users
     - Public read access for projects table
     - Authenticated access for CRM tables

  3. Sample Data
     - Insert 4 demo projects
     - Insert sample clients
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name text NOT NULL,
  city text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description_en text NOT NULL,
  long_description_en text NOT NULL DEFAULT '',
  images text[] DEFAULT '{}',
  map_embed_url text DEFAULT '',
  pdf_url text DEFAULT '',
  units jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  project_selected text DEFAULT '',
  message text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  author text NOT NULL,
  comment_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  type text NOT NULL DEFAULT 'phone',
  location text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Projects policies (public read access)
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true);

-- Clients policies (authenticated access)
CREATE POLICY "Anyone can insert clients"
  ON clients
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);

-- Comments policies (authenticated access)
CREATE POLICY "Authenticated users can manage comments"
  ON comments
  FOR ALL
  TO authenticated
  USING (true);

-- Appointments policies (authenticated access)
CREATE POLICY "Authenticated users can manage appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample projects
INSERT INTO projects (project_name, city, slug, short_description_en, long_description_en, images, map_embed_url, pdf_url, units) VALUES
(
  'David Residence',
  'Jerusalem',
  'david-residence',
  'Luxury residential complex in the heart of Jerusalem with modern amenities and stunning city views.',
  'David Residence offers an exceptional living experience in Jerusalem''s most prestigious neighborhood. This luxury development features modern architecture, premium finishes, and world-class amenities including a rooftop pool, fitness center, and 24/7 concierge service.',
  ARRAY[
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3!2d35.2137!3d31.7683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ2JzA2LjAiTiAzNcKwMTInNDkuMyJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
  '#',
  '[
    {"id": "unit-1", "unit_number": "1", "floor": 1, "surface": 85, "status": "available", "price": 750000},
    {"id": "unit-2", "unit_number": "2", "floor": 1, "surface": 95, "status": "available", "price": 820000},
    {"id": "unit-3", "unit_number": "3", "floor": 2, "surface": 110, "status": "reserved", "price": 950000},
    {"id": "unit-4", "unit_number": "4", "floor": 2, "surface": 85, "status": "available", "price": 780000},
    {"id": "unit-5", "unit_number": "5", "floor": 3, "surface": 120, "status": "sold", "price": 1050000},
    {"id": "unit-6", "unit_number": "6", "floor": 3, "surface": 90, "status": "available", "price": 850000},
    {"id": "unit-7", "unit_number": "7", "floor": 4, "surface": 100, "status": "available", "price": 920000},
    {"id": "unit-8", "unit_number": "8", "floor": 4, "surface": 95, "status": "reserved", "price": 880000},
    {"id": "unit-9", "unit_number": "9", "floor": 5, "surface": 130, "status": "available", "price": 1200000},
    {"id": "unit-10", "unit_number": "10", "floor": 5, "surface": 85, "status": "available", "price": 820000},
    {"id": "unit-11", "unit_number": "11", "floor": 6, "surface": 140, "status": "sold", "price": 1350000},
    {"id": "unit-12", "unit_number": "12", "floor": 6, "surface": 90, "status": "available", "price": 900000}
  ]'::jsonb
),
(
  'Tel Aviv Riviera',
  'Tel Aviv',
  'tel-aviv-riviera',
  'Beachfront luxury apartments with panoramic sea views and direct beach access.',
  'Tel Aviv Riviera represents the pinnacle of coastal living. Located on Tel Aviv''s prestigious coastline, this development offers unparalleled luxury with breathtaking Mediterranean views, private beach access, and world-class amenities.',
  ARRAY[
    'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.4!2d34.7818!3d32.0853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA1JzA3LjEiTiAzNMKwNDYnNTQuNSJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
  '#',
  '[
    {"id": "unit-1", "unit_number": "1", "floor": 1, "surface": 120, "status": "available", "price": 1200000},
    {"id": "unit-2", "unit_number": "2", "floor": 1, "surface": 140, "status": "sold", "price": 1400000},
    {"id": "unit-3", "unit_number": "3", "floor": 2, "surface": 150, "status": "available", "price": 1550000},
    {"id": "unit-4", "unit_number": "4", "floor": 2, "surface": 130, "status": "reserved", "price": 1350000},
    {"id": "unit-5", "unit_number": "5", "floor": 3, "surface": 160, "status": "available", "price": 1700000}
  ]'::jsonb
),
(
  'Haifa Bay Tower',
  'Haifa',
  'haifa-bay-tower',
  'Modern high-rise tower with spectacular bay views and premium facilities.',
  'Haifa Bay Tower stands as a beacon of modern luxury in Israel''s northern capital. This architectural marvel offers residents unprecedented views of the Mediterranean and Mount Carmel, with premium amenities and sophisticated design.',
  ARRAY[
    'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.2!2d34.9896!3d32.7940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ3JzM4LjQiTiAzNMKwNTknMjIuNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
  '#',
  '[
    {"id": "unit-1", "unit_number": "1", "floor": 5, "surface": 95, "status": "available", "price": 680000},
    {"id": "unit-2", "unit_number": "2", "floor": 5, "surface": 110, "status": "available", "price": 750000},
    {"id": "unit-3", "unit_number": "3", "floor": 10, "surface": 125, "status": "reserved", "price": 850000},
    {"id": "unit-4", "unit_number": "4", "floor": 10, "surface": 100, "status": "available", "price": 720000},
    {"id": "unit-5", "unit_number": "5", "floor": 15, "surface": 140, "status": "sold", "price": 980000}
  ]'::jsonb
),
(
  'Ashdod Luxe Garden',
  'Ashdod',
  'ashdod-luxe-garden',
  'Exclusive garden apartments with private outdoor spaces and modern design.',
  'Ashdod Luxe Garden offers a unique residential experience combining urban convenience with natural tranquility. Each apartment features private gardens and premium amenities in a beautifully landscaped setting.',
  ARRAY[
    'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8!2d34.6496!3d31.7943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ3JzM5LjUiTiAzNMKwMzgnNTguNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
  '#',
  '[
    {"id": "unit-1", "unit_number": "1", "floor": 1, "surface": 105, "status": "available", "price": 520000},
    {"id": "unit-2", "unit_number": "2", "floor": 1, "surface": 120, "status": "available", "price": 580000},
    {"id": "unit-3", "unit_number": "3", "floor": 2, "surface": 135, "status": "reserved", "price": 650000},
    {"id": "unit-4", "unit_number": "4", "floor": 2, "surface": 110, "status": "available", "price": 550000},
    {"id": "unit-5", "unit_number": "5", "floor": 3, "surface": 140, "status": "sold", "price": 690000}
  ]'::jsonb
);

-- Insert sample clients
INSERT INTO clients (full_name, email, phone, language, project_selected, message, status) VALUES
('John Doe', 'john@example.com', '+1234567890', 'en', 'david-residence', 'Interested in a 3-bedroom apartment with good views. Looking for move-in ready property.', 'new'),
('Marie Dupont', 'marie@example.com', '+33123456789', 'fr', 'tel-aviv-riviera', 'Looking for beachfront property for investment purposes. Budget up to 2M.', 'contacted'),
('David Cohen', 'david@example.com', '+972501234567', 'he', 'haifa-bay-tower', 'Interested in investment opportunity. Please send detailed financial projections.', 'in_progress'),
('Anna Volkov', 'anna@example.com', '+79123456789', 'ru', 'ashdod-luxe-garden', 'Looking for family home with garden. Need 4 bedrooms minimum.', 'new'),
('Michael Brown', 'michael@example.com', '+44123456789', 'en', 'david-residence', 'Interested in luxury apartment in central location. Cash buyer.', 'sold'),
('Sophie Martin', 'sophie@example.com', '+33987654321', 'fr', 'tel-aviv-riviera', 'Looking for vacation home by the sea. Flexible on timing.', 'contacted'),
('Ahmed Hassan', 'ahmed@example.com', '+971501234567', 'en', 'haifa-bay-tower', 'Business investor seeking high-yield properties. Open to multiple units.', 'in_progress'),
('Elena Petrov', 'elena@example.com', '+79876543210', 'ru', 'ashdod-luxe-garden', 'Relocating to Israel for work. Need family-friendly neighborhood.', 'not_interested');

-- Insert sample comments
INSERT INTO comments (client_id, author, comment_text) VALUES
((SELECT id FROM clients WHERE email = 'john@example.com'), 'Sarah Agent', 'Initial contact made. Very interested in penthouse units.'),
((SELECT id FROM clients WHERE email = 'marie@example.com'), 'David Agent', 'Sent property brochure. Scheduled viewing for next week.'),
((SELECT id FROM clients WHERE email = 'david@example.com'), 'Sarah Agent', 'Discussed financing options. Ready to move forward with purchase.'),
((SELECT id FROM clients WHERE email = 'anna@example.com'), 'Michael Agent', 'Called but no answer. Will try again tomorrow.'),
((SELECT id FROM clients WHERE email = 'michael@example.com'), 'Sarah Agent', 'Deal closed successfully. Very satisfied client.');

-- Insert sample appointments
INSERT INTO appointments (client_id, date, time, type, location, notes) VALUES
((SELECT id FROM clients WHERE email = 'marie@example.com'), '2024-01-20', '14:00', 'in_person', 'Tel Aviv Riviera Sales Office', 'Property viewing and contract discussion'),
((SELECT id FROM clients WHERE email = 'david@example.com'), '2024-01-21', '10:00', 'zoom', 'Online Meeting', 'Financial review and closing preparation'),
((SELECT id FROM clients WHERE email = 'anna@example.com'), '2024-01-22', '16:00', 'phone', '', 'Follow-up call to discuss requirements'),
((SELECT id FROM clients WHERE email = 'ahmed@example.com'), '2024-01-23', '11:00', 'in_person', 'Haifa Bay Tower', 'Site visit and investment discussion');