-- ==============================================================================
-- BRANDUM INC MARKET RESEARCH - COMPLETE SEED DATA
-- ==============================================================================

-- 1. Company Profile
INSERT INTO public.company_profiles (
  company_name,
  tagline,
  description,
  experience,
  address,
  phone,
  email,
  pan_india_details
) VALUES (
  'Brandum INC Market Research',
  'Decade of Excellence in Quantitative & Qualitative Field Intelligence',
  'Brandum INC is a premier full-service market research and field operations agency. With over a decade of nationwide operational experience, we provide high-integrity consumer insights, physical and mystery audits, industrial market assessments, and large-scale demographic surveys across urban, semi-urban, and deep rural India.',
  '10+ Years of Field Operations & Market Research Excellence',
  'Corporate Towers, Level 4, Business Bay, New Delhi & Mumbai, India',
  '+91 11 4982 7700 / +91 98110 55432',
  'contact@branduminc.com',
  'PAN India Presence across 28 States and 8 Union Territories with a trained field network of 1,500+ local language investigators.'
) ON CONFLICT DO NOTHING;

-- 2. Services (All 17 Services)
INSERT INTO public.services (title, slug, description, detailed_content, category, image_url, is_active, display_order)
VALUES
(
  'Face-to-Face Connect',
  'face-to-face-connect',
  'In-person quantitative and qualitative interviews conducted at respondents homes, workplaces, or commercial hubs across India.',
  'Our Face-to-Face (F2F) field research leverages rigorous sampling methodologies, multi-lingual field surveyors, and GPS-enabled CAPI (Computer Assisted Personal Interviewing) mobile tablets. We maintain strict audio-audit verification and supervisor re-checks to guarantee data integrity.',
  'Field Operations',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
  true,
  1
),
(
  'CLT – Central Location Test',
  'clt-central-location-test',
  'Controlled environment product tasting, sensory analysis, packaging evaluation, and concept validation.',
  'We manage fully air-conditioned, scientifically arranged testing hubs across major metro and tier-2/3 Indian cities. Equipped with segregated preparation booths, temperature control, and standardized lighting for unbiased sensory and concept evaluations.',
  'Quantitative Research',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  true,
  2
),
(
  'DI – Depth Interview',
  'depth-interview',
  'High-level, exploratory one-on-one sessions with key opinion leaders, industry executives, and niche consumer personas.',
  'Led by senior qualitative moderators with 10+ years of domain experience. We extract deep subconscious attitudes, cognitive purchase paths, and institutional dynamics using projective techniques and laddering.',
  'Qualitative Research',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  true,
  3
),
(
  'FGD – Focus Group Discussion',
  'focus-group-discussion',
  'Dynamic interactive group sessions to evaluate brand sentiment, product resonance, and social consensus.',
  'Conducted in state-of-the-art viewing facilities with one-way mirrors, digital video live-streaming, and simultaneous language interpretation. Tailored for consumer goods, healthcare, automotive, and political sentiment analysis.',
  'Qualitative Research',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  true,
  4
),
(
  'Mystery Audit',
  'mystery-audit',
  'Unannounced audits assessing retail compliance, frontline sales pitch quality, customer experience, and SOP fidelity.',
  'Our undercover auditors test customer journeys across retail showrooms, banking branches, hotels, healthcare centers, and auto dealerships, capturing photographic proof and objective scorecards.',
  'Audits & Compliance',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  true,
  5
),
(
  'Physical Audit',
  'physical-audit',
  'Rigorous on-ground verification of stock, point-of-sale display compliance, pricing integrity, and distributor infrastructure.',
  'Comprehensive stock-take, shelf share measurement, asset verification, and competitive merchandising tracking executed with geo-tagged photographic evidence.',
  'Audits & Compliance',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  true,
  6
),
(
  'Ethnography',
  'ethnography',
  'Immersive in-home and contextual observation of real consumer rituals, lifestyle habits, and usage patterns.',
  'Researchers spend extended hours with families and business operators, mapping micro-moments, unarticulated pain points, storage habits, and actual brand interactions in the real living environment.',
  'Qualitative Research',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
  true,
  7
),
(
  'Census',
  'census',
  'Exhaustive territory-wide census and universal mapping of retail points, demographic units, and healthcare providers.',
  'Complete enumeration of commercial and residential establishments in designated clusters, micro-markets, or industrial corridors, producing geo-referenced baseline master databases.',
  'Field Operations',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  true,
  8
),
(
  'Data Processing and Update',
  'data-processing-and-update',
  'High-speed data cleansing, automated validation, statistical cross-tabulation, and ongoing database enrichment.',
  'Our data analytics team utilizes advanced scripting and double-entry protocols to clean messy raw datasets, code open-ended responses, structure relational databases, and deliver clean, analysis-ready SPSS/CSV files.',
  'Analytics & Technology',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  true,
  9
),
(
  'Lead Generation',
  'lead-generation',
  'B2B and B2C targeted prospecting, telephone pre-qualification, and decision-maker validation across India.',
  'Multi-channel outreach connecting your sales teams directly with verified decision-makers across manufacturing, real estate, enterprise software, and commercial services.',
  'Business Intelligence',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  true,
  10
),
(
  'Product Testing',
  'product-testing',
  'In-home usage testing (IHUT) and bench evaluations to test product performance, durability, and taste profiles.',
  'We distribute blind samples to targeted demographics, track week-by-week usage journals, and capture comparative feedback against competing benchmark products.',
  'Quantitative Research',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  true,
  11
),
(
  'Impact Checking',
  'impact-checking',
  'Pre and post campaign assessment measuring advertising recall, social intervention efficacy, and brand lift.',
  'Rigorous difference-in-differences (DiD) and control-vs-exposed sampling to quantify the true commercial or social ROI of marketing campaigns, CSR interventions, and policy initiatives.',
  'Analytics & Technology',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  true,
  12
),
(
  'Social Media Management',
  'social-media-management',
  'Digital narrative tracking, social listening, sentiment analysis, and brand reputation management.',
  'Harnessing AI-powered social scraping and human qualitative scrutiny to track trending conversations, detect early PR crises, and optimize digital brand touchpoints across regional languages.',
  'Digital & Strategy',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
  true,
  13
),
(
  'Election Campaign Management',
  'election-campaign-management',
  'Constituency profiling, booth-level sentiment tracking, voter mood polling, and narrative alignment strategies.',
  'End-to-end political intelligence combining booth-level demographic mapping, door-to-door pulse surveys, candidate perception testing, and ground mobilization audits.',
  'Specialized Research',
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  true,
  14
),
(
  'Recruitment Process Support',
  'recruitment-process-support',
  'Specialized sourcing, screening, and verification of targeted respondent cohorts and research field teams.',
  'Rapid deployment of hard-to-reach respondent profiles including C-suite executives, rare disease patients, rural farmers, and technical specialists with stringent double-screening.',
  'Specialized Research',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
  true,
  15
),
(
  'CATI and Online Data Collection',
  'cati-and-online-data-collection',
  'Computer-Assisted Telephone Interviewing (CATI) and mobile-responsive digital surveys across diverse languages.',
  'Operating state-of-the-art inbound and outbound calling centers staffed with multi-lingual interviewers, combined with programmatic online panel distribution for lightning-fast survey turnaround.',
  'Quantitative Research',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  true,
  16
),
(
  'Consumer and Healthcare Panel Management',
  'consumer-and-healthcare-panel-management',
  'Proprietary verified panels of healthcare professionals (HCPs), B2B influencers, and vetted consumer segments.',
  'Actively maintained, opt-in panels with ongoing profiling, anti-fraud telemetry, and high engagement rates for reliable recurring longitudinal studies.',
  'Panel Management',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  true,
  17
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  detailed_content = EXCLUDED.detailed_content,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order;

-- 3. Industries (All 11 Industries)
INSERT INTO public.industries (title, slug, description, detailed_content, image_url, is_active, display_order)
VALUES
(
  'Retail',
  'retail',
  'Modern trade, general trade, mall intercept, and shopper journey insights across urban and rural markets.',
  'We assist top retail chains and FMCG brands with footfall analytics, planogram compliance, store staff audits, price elasticity studies, and omnichannel consumer journey mapping.',
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80',
  true,
  1
),
(
  'Agriculture',
  'agriculture',
  'Ground-level farmer interviews, agri-input dealer audits, crop pattern studies, and rural mechanization research.',
  'Our rural field force conducts deep mandi audits, seed and fertilizer brand preference tracking, tractor and implement perception studies across Indian farming heartlands.',
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  true,
  2
),
(
  'NGO',
  'ngo',
  'Baseline, midline, and endline program evaluations, socioeconomic impact tracking, and community assessments.',
  'We partner with leading national and international development foundations to rigorously assess educational interventions, water/sanitation health outcomes, and women empowerment initiatives.',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  true,
  3
),
(
  'Government',
  'government',
  'Citizen feedback mechanisms, public welfare scheme penetration surveys, and municipal service performance reviews.',
  'Providing empirical field evidence and public policy research that helps government bodies and civic institutions optimize public welfare delivery and urban infrastructure.',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  true,
  4
),
(
  'Healthcare and Pharma',
  'healthcare-and-pharma',
  'Key opinion leader (KOL) depth interviews, patient journey studies, pharmacy audits, and clinical adoption rates.',
  'Specialized medical field team engaging physicians, pharmacists, hospital administrators, and patients across therapy areas including cardiology, oncology, diabetes, and rare ailments.',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  true,
  5
),
(
  'Real Estate',
  'real-estate',
  'Buyer intent mapping, site visit experience audits, competitive pricing intelligence, and broker networks.',
  'Delivering actionable demographic and affordability insights for residential developers, commercial REITs, and co-working space operators across major metropolitan corridors.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  true,
  6
),
(
  'Manufacturing',
  'manufacturing',
  'Industrial B2B buyer behavior, supply chain resilience, distributor sentiment, and equipment OEM perception.',
  'Comprehensive plant manager interviews, OEM vendor satisfaction tracking, industrial lubricants, and heavy engineering component demand forecasting.',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  true,
  7
),
(
  'Food and Beverages',
  'food-and-beverages',
  'Sensory CLT evaluations, menu testing, HORECA distributor audits, and emerging consumer flavor preferences.',
  'From packaged snack benchmarking to institutional restaurant supply audits, we provide actionable data on packaging aesthetics, taste preference, and price positioning.',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
  true,
  8
),
(
  'E-Commerce',
  'e-commerce',
  'Last-mile delivery experience audits, online shopper drop-off analysis, return policy feedback, and seller satisfaction.',
  'Uncovering digital shopping habits, app usability barriers, unboxing sentiment, and marketplace seller pain points to elevate customer lifetime value.',
  'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
  true,
  9
),
(
  'Civics and Politics',
  'civics-and-politics',
  'Constituency mood analysis, candidate image evaluation, voter priority rankings, and public policy perception.',
  'Empirical, non-partisan ground intelligence combining granular demographic sampling, local grievance auditing, and longitudinal voter sentiment tracking.',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
  true,
  10
),
(
  'Information Technology',
  'information-technology',
  'CIO/CTO enterprise software purchase drivers, SaaS adoption curves, developer sentiment, and cloud migration barriers.',
  'B2B research with IT decision-makers exploring cyber-security priorities, AI tooling adoption, vendor selection criteria, and SLA satisfaction.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  true,
  11
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  detailed_content = EXCLUDED.detailed_content,
  image_url = EXCLUDED.image_url,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order;

-- 4. Website Content Blocks
INSERT INTO public.website_content (section_key, title, description, content, image_url)
VALUES
(
  'home_hero',
  'Empowering Decisions with High-Integrity Ground Intelligence',
  'Over a decade of leadership in qualitative field explorations, quantitative sampling, physical audits, and pan-India consumer panels.',
  '{"badge": "10+ Years of Field Excellence", "primary_cta": "Explore Services", "secondary_cta": "Join Our Field Panel", "stats": [{"label": "Years Experience", "value": "10+"}, {"label": "Completed Projects", "value": "1,200+"}, {"label": "Survey Responses", "value": "2.5M+"}, {"label": "PAN India States & UTs", "value": "28+8"}]}'::jsonb,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80'
),
(
  'why_choose_us',
  'Why Global & National Brands Trust Brandum INC',
  'We blend rigorous statistical governance with battle-tested on-ground field execution.',
  '{"features": [
    {"title": "Uncompromised Data Integrity", "desc": "Triple-layer QA including GPS geo-stamping, 100% audio recording validation, and telephonic supervisor back-checks."},
    {"title": "PAN India Deep Reach", "desc": "Active field teams across 28 States and 8 Union Territories capable of executing simultaneous multi-state studies in local dialects."},
    {"title": "Agile Turnaround Time", "desc": "Streamlined CAPI mobile workflows and real-time cloud data pipelines delivering preliminary insights in as few as 72 hours."},
    {"title": "Dedicated Subject Experts", "desc": "Specialized sector leads across Healthcare, FMCG, Agriculture, Public Policy, and Enterprise Tech."},
    {"title": "Ethical Respondent Treatment", "desc": "Strict adherence to ESOMAR and MRSI guidelines with certified consent protocols and privacy safeguarding."},
    {"title": "Customized Methodologies", "desc": "Bespoke hybrid research combining quantitative scale with nuanced ethnographic qualitative depth."}
  ]}'::jsonb,
  null
),
(
  'pan_india_presence',
  'Unrivaled PAN India Field Infrastructure',
  'From Tier-1 Metros to Remote Gram Panchayats',
  '{"regions": [
    {"name": "Northern Hub", "cities": "Delhi NCR, Lucknow, Chandigarh, Jaipur, Dehradun, Srinagar", "field_strength": "450+ Surveyors"},
    {"name": "Western Hub", "cities": "Mumbai, Pune, Ahmedabad, Surat, Indore, Nagpur", "field_strength": "380+ Surveyors"},
    {"name": "Southern Hub", "cities": "Bengaluru, Chennai, Hyderabad, Kochi, Coimbatore, Vizag", "field_strength": "420+ Surveyors"},
    {"name": "Eastern Hub", "cities": "Kolkata, Patna, Bhubaneswar, Ranchi, Guwahati, Agartala", "field_strength": "350+ Surveyors"}
  ]}'::jsonb,
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url;

