-- Leads table for CRM
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    assigned_to UUID REFERENCES auth.users(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can create leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

CREATE POLICY "Authenticated users can view leads" ON public.leads
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can submit leads" ON public.leads
FOR INSERT WITH CHECK (true);

-- Appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id),
    user_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
    meeting_link TEXT,
    location TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Authenticated can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update own appointments" ON public.appointments;

CREATE POLICY "Users can view own appointments" ON public.appointments
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated can create appointments" ON public.appointments
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Users can update own appointments" ON public.appointments
FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method TEXT DEFAULT 'upi',
    transaction_id TEXT UNIQUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;

CREATE POLICY "Users can view own payments" ON public.payments
FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Content generations table for AI tools
CREATE TABLE IF NOT EXISTS public.content_generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('email', 'instagram', 'facebook', 'youtube', 'ad_copy', 'blog')),
    prompt TEXT NOT NULL,
    result TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.content_generations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own content" ON public.content_generations;
DROP POLICY IF EXISTS "Users can create content" ON public.content_generations;

CREATE POLICY "Users can view own content" ON public.content_generations
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can create content" ON public.content_generations
FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    tags TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can manage own posts" ON public.blog_posts;

CREATE POLICY "Anyone can view published posts" ON public.blog_posts
FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage own posts" ON public.blog_posts
FOR ALL TO authenticated USING (author_id = auth.uid());

-- Testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    content TEXT NOT NULL,
    avatar TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;

CREATE POLICY "Anyone can view testimonials" ON public.testimonials
FOR SELECT USING (true);

-- Insert default testimonials
INSERT INTO public.testimonials (name, role, company, content, rating, featured) VALUES
('Sarah Johnson', 'Marketing Director', 'TechCorp', 'GuideSoft transformed our marketing workflow. The AI tools saved us hours every week!', 5, true),
('Michael Chen', 'CEO', 'StartupXYZ', 'The best investment we made for our brand. Professional results in minutes.', 5, true),
('Emily Rodriguez', 'Content Manager', 'MediaHub', 'Finally, an all-in-one platform that actually delivers on its promises.', 5, true)
ON CONFLICT DO NOTHING;