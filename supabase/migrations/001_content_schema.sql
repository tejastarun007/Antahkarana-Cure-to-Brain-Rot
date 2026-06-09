-- Migration: Move static content.ts to Supabase for live updates
-- This creates the schema to replace src/data/content.ts

CREATE TABLE public.habits (
  id text PRIMARY KEY,
  name text NOT NULL,
  duration text NOT NULL,
  boost text NOT NULL,
  tradeoff integer NOT NULL,
  category text NOT NULL, -- 'yoga', 'brain', 'body'
  icon text NOT NULL,
  deva text NOT NULL,
  sub text NOT NULL,
  neuro text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.wisdoms (
  id text PRIMARY KEY,
  sanskrit text NOT NULL,
  translation text NOT NULL,
  source text NOT NULL,
  category text NOT NULL,
  evidence jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true
);

CREATE TABLE public.tradeoffs (
  id integer PRIMARY KEY,
  title text NOT NULL,
  symptom text NOT NULL,
  cure text NOT NULL,
  deva text NOT NULL,
  loss text NOT NULL
);

CREATE TABLE public.tiers (
  level integer PRIMARY KEY,
  name text NOT NULL,
  percent integer NOT NULL,
  trait text NOT NULL,
  attention_span text NOT NULL,
  color text NOT NULL
);

-- RLS Policies
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wisdoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tradeoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.habits FOR SELECT
  USING ( true );

CREATE POLICY "Public wisdoms are viewable by everyone."
  ON public.wisdoms FOR SELECT
  USING ( true );

CREATE POLICY "Public tradeoffs are viewable by everyone."
  ON public.tradeoffs FOR SELECT
  USING ( true );

CREATE POLICY "Public tiers are viewable by everyone."
  ON public.tiers FOR SELECT
  USING ( true );
