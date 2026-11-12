-- ==============================================================================
-- BRANDUM INC MARKET RESEARCH - COMPLETE DATABASE SCHEMA & POLICIES
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (Public Users / Field Panel Members)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile_number TEXT NOT NULL,
  company_name TEXT,
  designation TEXT,
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  last_login_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(account_status);

-- ------------------------------------------------------------------------------
-- 2. ADMIN PROFILES TABLE (Single Super Admin)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_auth_id ON public.admin_profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON public.admin_profiles(email);

-- ------------------------------------------------------------------------------
-- 3. COMPANY PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.company_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  experience TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  pan_india_details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. SERVICES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  detailed_content TEXT,
  category TEXT DEFAULT 'Market Research',
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(display_order);

-- ------------------------------------------------------------------------------
-- 5. INDUSTRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  detailed_content TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_industries_slug ON public.industries(slug);
CREATE INDEX IF NOT EXISTS idx_industries_order ON public.industries(display_order);

-- ------------------------------------------------------------------------------
-- 6. CONTACT ENQUIRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'in_progress', 'resolved', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created ON public.contact_enquiries(created_at DESC);

-- ------------------------------------------------------------------------------
-- 7. WEBSITE CONTENT TABLE (Dynamic homepage and static page blocks)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_website_content_key ON public.website_content(section_key);

-- ------------------------------------------------------------------------------
-- TRIGGERS: auto-update updated_at timestamp
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS tr_company_profiles_updated_at ON public.company_profiles;
CREATE TRIGGER tr_company_profiles_updated_at
  BEFORE UPDATE ON public.company_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS tr_services_updated_at ON public.services;
CREATE TRIGGER tr_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS tr_industries_updated_at ON public.industries;
CREATE TRIGGER tr_industries_updated_at
  BEFORE UPDATE ON public.industries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS tr_website_content_updated_at ON public.website_content;
CREATE TRIGGER tr_website_content_updated_at
  BEFORE UPDATE ON public.website_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------

-- Helper function: check if authenticated user is the super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE auth_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
-- Public user can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_super_admin());

-- Public user can update their own permitted profile fields
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_super_admin());

-- Super admin can insert or delete profiles (or user self-insert on registration)
CREATE POLICY "Users or admin can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id OR public.is_super_admin());

CREATE POLICY "Super admin can delete profiles"
  ON public.profiles FOR DELETE
  USING (public.is_super_admin());

-- 2. Admin Profiles Policies
CREATE POLICY "Admin can view admin profile"
  ON public.admin_profiles FOR SELECT
  USING (public.is_super_admin());

-- 3. Company Profiles Policies
CREATE POLICY "Public can view company profile"
  ON public.company_profiles FOR SELECT
  USING (true);

CREATE POLICY "Super admin can update company profile"
  ON public.company_profiles FOR ALL
  USING (public.is_super_admin());

-- 4. Services Policies
CREATE POLICY "Public can view active services"
  ON public.services FOR SELECT
  USING (is_active = true OR public.is_super_admin());

CREATE POLICY "Super admin can manage services"
  ON public.services FOR ALL
  USING (public.is_super_admin());

-- 5. Industries Policies
CREATE POLICY "Public can view active industries"
  ON public.industries FOR SELECT
  USING (is_active = true OR public.is_super_admin());

CREATE POLICY "Super admin can manage industries"
  ON public.industries FOR ALL
  USING (public.is_super_admin());

-- 6. Contact Enquiries Policies
CREATE POLICY "Public can insert enquiries"
  ON public.contact_enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Super admin can view and manage enquiries"
  ON public.contact_enquiries FOR ALL
  USING (public.is_super_admin());

-- 7. Website Content Policies
CREATE POLICY "Public can view website content"
  ON public.website_content FOR SELECT
  USING (true);

CREATE POLICY "Super admin can manage website content"
  ON public.website_content FOR ALL
  USING (public.is_super_admin());

