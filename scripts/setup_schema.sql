-- Script SQL para criar/atualizar as tabelas no Supabase
-- Este script é seguro para rodar múltiplas vezes (idempotente)

-- 1. Criação da tabela Profiles (se não existir)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name text DEFAULT 'Operador Logístico',
  avatar_url text,
  email text,
  phone text,
  daily_goal numeric DEFAULT 500,
  package_value numeric DEFAULT 2.50,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Adicionar colunas que podem não existir ainda (seguro rodar várias vezes)
DO $$ BEGIN
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_goal numeric DEFAULT 500;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS package_value numeric DEFAULT 2.50;
END $$;

-- Ativar RLS para Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas para evitar conflito, depois recriar
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 2. Criação da tabela Vehicles (se não existir)
CREATE TABLE IF NOT EXISTS public.vehicles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  model text NOT NULL,
  plate text NOT NULL,
  color text,
  renavam text,
  year text,
  capacity numeric,
  category text,
  is_active boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Ativar RLS para Vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own vehicles." ON vehicles;
CREATE POLICY "Users can view their own vehicles."
  ON vehicles FOR SELECT
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can insert their own vehicles." ON vehicles;
CREATE POLICY "Users can insert their own vehicles."
  ON vehicles FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can update their own vehicles." ON vehicles;
CREATE POLICY "Users can update their own vehicles."
  ON vehicles FOR UPDATE
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete their own vehicles." ON vehicles;
CREATE POLICY "Users can delete their own vehicles."
  ON vehicles FOR DELETE
  USING ( auth.uid() = user_id );

-- 3. Trigger para criar perfil automaticamente no SignUp
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, 'Operador Logístico', null);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- OBS: O bucket 'avatars' já existe, não é necessário criá-lo.
