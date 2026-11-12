import { Service, Industry, CompanyProfile, WebsiteContent } from "@/types/database.types";

export const initialCompanyProfile: CompanyProfile = {
  id: "comp-001",
  company_name: "Brandum INC Market Research",
  tagline: "Decade of Excellence in Quantitative & Qualitative Field Intelligence",
  description:
    "Brandum INC is a premier full-service market research and field operations agency. With over a decade of nationwide operational experience, we provide high-integrity consumer insights, physical and mystery audits, industrial market assessments, and large-scale demographic surveys across urban, semi-urban, and deep rural India.",
  experience: "10+ Years of Field Operations & Market Research Excellence",
  address: "Corporate Towers, Level 4, Business Bay, New Delhi & Mumbai, India",
  phone: "+91 11 4982 7700 / +91 98110 55432",
  email: "contact@branduminc.com",
  pan_india_details:
    "PAN India Presence across 28 States and 8 Union Territories with a trained field network of 1,500+ local language investigators.",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialServices: Service[] = [
  {
    id: "srv-001",
    title: "Face-to-Face Connect",
    slug: "face-to-face-connect",
    description:
      "In-person quantitative and qualitative interviews conducted at respondents' homes, workplaces, or commercial hubs across India.",
    detailed_content:
      "Our Face-to-Face (F2F) field research leverages rigorous sampling methodologies, multi-lingual field surveyors, and GPS-enabled CAPI (Computer Assisted Personal Interviewing) mobile tablets. We maintain strict audio-audit verification and supervisor re-checks to guarantee data integrity.",
    category: "Field Operations",
    image_url:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-002",
    title: "CLT – Central Location Test",
    slug: "clt-central-location-test",
    description:
      "Controlled environment product tasting, sensory analysis, packaging evaluation, and concept validation.",
    detailed_content:
      "We manage fully air-conditioned, scientifically arranged testing hubs across major metro and tier-2/3 Indian cities. Equipped with segregated preparation booths, temperature control, and standardized lighting for unbiased sensory and concept evaluations.",
    category: "Quantitative Research",
    image_url:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-003",
    title: "DI – Depth Interview",
    slug: "depth-interview",
    description:
      "High-level, exploratory one-on-one sessions with key opinion leaders, industry executives, and niche consumer personas.",
    detailed_content:
      "Led by senior qualitative moderators with 10+ years of domain experience. We extract deep subconscious attitudes, cognitive purchase paths, and institutional dynamics using projective techniques and laddering.",
    category: "Qualitative Research",
    image_url:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-004",
    title: "FGD – Focus Group Discussion",
    slug: "focus-group-discussion",
    description:
      "Dynamic interactive group sessions to evaluate brand sentiment, product resonance, and social consensus.",
    detailed_content:
      "Conducted in state-of-the-art viewing facilities with one-way mirrors, digital video live-streaming, and simultaneous language interpretation. Tailored for consumer goods, healthcare, automotive, and political sentiment analysis.",
    category: "Qualitative Research",
    image_url:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-005",
    title: "Mystery Audit",
    slug: "mystery-audit",
    description:
      "Unannounced audits assessing retail compliance, frontline sales pitch quality, customer experience, and SOP fidelity.",
    detailed_content:
      "Our undercover auditors test customer journeys across retail showrooms, banking branches, hotels, healthcare centers, and auto dealerships, capturing photographic proof and objective scorecards.",
    category: "Audits & Compliance",
    image_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-006",
    title: "Physical Audit",
    slug: "physical-audit",
    description:
      "Rigorous on-ground verification of stock, point-of-sale display compliance, pricing integrity, and distributor infrastructure.",
    detailed_content:
      "Comprehensive stock-take, shelf share measurement, asset verification, and competitive merchandising tracking executed with geo-tagged photographic evidence.",
    category: "Audits & Compliance",
    image_url:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-007",
    title: "Ethnography",
    slug: "ethnography",
    description:
      "Immersive in-home and contextual observation of real consumer rituals, lifestyle habits, and usage patterns.",
    detailed_content:
      "Researchers spend extended hours with families and business operators, mapping micro-moments, unarticulated pain points, storage habits, and actual brand interactions in the real living environment.",
    category: "Qualitative Research",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-008",
    title: "Census",
    slug: "census",
    description:
      "Exhaustive territory-wide census and universal mapping of retail points, demographic units, and healthcare providers.",
    detailed_content:
      "Complete enumeration of commercial and residential establishments in designated clusters, micro-markets, or industrial corridors, producing geo-referenced baseline master databases.",
    category: "Field Operations",
    image_url:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-009",
    title: "Data Processing and Update",
    slug: "data-processing-and-update",
    description:
      "High-speed data cleansing, automated validation, statistical cross-tabulation, and ongoing database enrichment.",
    detailed_content:
      "Our data analytics team utilizes advanced scripting and double-entry protocols to clean messy raw datasets, code open-ended responses, structure relational databases, and deliver clean, analysis-ready SPSS/CSV files.",
    category: "Analytics & Technology",
    image_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-010",
    title: "Lead Generation",
    slug: "lead-generation",
    description:
      "B2B and B2C targeted prospecting, telephone pre-qualification, and decision-maker validation across India.",
    detailed_content:
      "Multi-channel outreach connecting your sales teams directly with verified decision-makers across manufacturing, real estate, enterprise software, and commercial services.",
    category: "Business Intelligence",
    image_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-011",
    title: "Product Testing",
    slug: "product-testing",
    description:
      "In-home usage testing (IHUT) and bench evaluations to test product performance, durability, and taste profiles.",
    detailed_content:
      "We distribute blind samples to targeted demographics, track week-by-week usage journals, and capture comparative feedback against competing benchmark products.",
    category: "Quantitative Research",
    image_url:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-012",
    title: "Impact Checking",
    slug: "impact-checking",
    description:
      "Pre and post campaign assessment measuring advertising recall, social intervention efficacy, and brand lift.",
    detailed_content:
      "Rigorous difference-in-differences (DiD) and control-vs-exposed sampling to quantify the true commercial or social ROI of marketing campaigns, CSR interventions, and policy initiatives.",
    category: "Analytics & Technology",
    image_url:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-013",
    title: "Social Media Management",
    slug: "social-media-management",
    description:
      "Digital narrative tracking, social listening, sentiment analysis, and brand reputation management.",
    detailed_content:
      "Harnessing AI-powered social scraping and human qualitative scrutiny to track trending conversations, detect early PR crises, and optimize digital brand touchpoints across regional languages.",
    category: "Digital & Strategy",
    image_url:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 13,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-014",
    title: "Election Campaign Management",
    slug: "election-campaign-management",
    description:
      "Constituency profiling, booth-level sentiment tracking, voter mood polling, and narrative alignment strategies.",
    detailed_content:
      "End-to-end political intelligence combining booth-level demographic mapping, door-to-door pulse surveys, candidate perception testing, and ground mobilization audits.",
    category: "Specialized Research",
    image_url:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-015",
    title: "Recruitment Process Support",
    slug: "recruitment-process-support",
    description:
      "Specialized sourcing, screening, and verification of targeted respondent cohorts and research field teams.",
    detailed_content:
      "Rapid deployment of hard-to-reach respondent profiles including C-suite executives, rare disease patients, rural farmers, and technical specialists with stringent double-screening.",
    category: "Specialized Research",
    image_url:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-016",
    title: "CATI and Online Data Collection",
    slug: "cati-and-online-data-collection",
    description:
      "Computer-Assisted Telephone Interviewing (CATI) and mobile-responsive digital surveys across diverse languages.",
    detailed_content:
      "Operating state-of-the-art inbound and outbound calling centers staffed with multi-lingual interviewers, combined with programmatic online panel distribution for lightning-fast survey turnaround.",
    category: "Quantitative Research",
    image_url:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 16,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-017",
    title: "Consumer and Healthcare Panel Management",
    slug: "consumer-and-healthcare-panel-management",
    description:
      "Proprietary verified panels of healthcare professionals (HCPs), B2B influencers, and vetted consumer segments.",
    detailed_content:
      "Actively maintained, opt-in panels with ongoing profiling, anti-fraud telemetry, and high engagement rates for reliable recurring longitudinal studies.",
    category: "Panel Management",
    image_url:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 17,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const initialIndustries: Industry[] = [
  {
    id: "ind-001",
    title: "Retail",
    slug: "retail",
    description:
      "Modern trade, general trade, mall intercept, and shopper journey insights across urban and rural markets.",
    detailed_content:
      "We assist top retail chains and FMCG brands with footfall analytics, planogram compliance, store staff audits, price elasticity studies, and omnichannel consumer journey mapping.",
    image_url:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-002",
    title: "Agriculture",
    slug: "agriculture",
    description:
      "Ground-level farmer interviews, agri-input dealer audits, crop pattern studies, and rural mechanization research.",
    detailed_content:
      "Our rural field force conducts deep mandi audits, seed and fertilizer brand preference tracking, tractor and implement perception studies across Indian farming heartlands.",
    image_url:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-003",
    title: "NGO",
    slug: "ngo",
    description:
      "Baseline, midline, and endline program evaluations, socioeconomic impact tracking, and community assessments.",
    detailed_content:
      "We partner with leading national and international development foundations to rigorously assess educational interventions, water/sanitation health outcomes, and women empowerment initiatives.",
    image_url:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-004",
    title: "Government",
    slug: "government",
    description:
      "Citizen feedback mechanisms, public welfare scheme penetration surveys, and municipal service performance reviews.",
    detailed_content:
      "Providing empirical field evidence and public policy research that helps government bodies and civic institutions optimize public welfare delivery and urban infrastructure.",
    image_url:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-005",
    title: "Healthcare and Pharma",
    slug: "healthcare-and-pharma",
    description:
      "Key opinion leader (KOL) depth interviews, patient journey studies, pharmacy audits, and clinical adoption rates.",
    detailed_content:
      "Specialized medical field team engaging physicians, pharmacists, hospital administrators, and patients across therapy areas including cardiology, oncology, diabetes, and rare ailments.",
    image_url:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-006",
    title: "Real Estate",
    slug: "real-estate",
    description:
      "Buyer intent mapping, site visit experience audits, competitive pricing intelligence, and broker networks.",
    detailed_content:
      "Delivering actionable demographic and affordability insights for residential developers, commercial REITs, and co-working space operators across major metropolitan corridors.",
    image_url:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-007",
    title: "Manufacturing",
    slug: "manufacturing",
    description:
      "Industrial B2B buyer behavior, supply chain resilience, distributor sentiment, and equipment OEM perception.",
    detailed_content:
      "Comprehensive plant manager interviews, OEM vendor satisfaction tracking, industrial lubricants, and heavy engineering component demand forecasting.",
    image_url:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-008",
    title: "Food and Beverages",
    slug: "food-and-beverages",
    description:
      "Sensory CLT evaluations, menu testing, HORECA distributor audits, and emerging consumer flavor preferences.",
    detailed_content:
      "From packaged snack benchmarking to institutional restaurant supply audits, we provide actionable data on packaging aesthetics, taste preference, and price positioning.",
    image_url:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-009",
    title: "E-Commerce",
    slug: "e-commerce",
    description:
      "Last-mile delivery experience audits, online shopper drop-off analysis, return policy feedback, and seller satisfaction.",
    detailed_content:
      "Uncovering digital shopping habits, app usability barriers, unboxing sentiment, and marketplace seller pain points to elevate customer lifetime value.",
    image_url:
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-010",
    title: "Civics and Politics",
    slug: "civics-and-politics",
    description:
      "Constituency mood analysis, candidate image evaluation, voter priority rankings, and public policy perception.",
    detailed_content:
      "Empirical, non-partisan ground intelligence combining granular demographic sampling, local grievance auditing, and longitudinal voter sentiment tracking.",
    image_url:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "ind-011",
    title: "Information Technology",
    slug: "information-technology",
    description:
      "CIO/CTO enterprise software purchase drivers, SaaS adoption curves, developer sentiment, and cloud migration barriers.",
    detailed_content:
      "B2B research with IT decision-makers exploring cyber-security priorities, AI tooling adoption, vendor selection criteria, and SLA satisfaction.",
    image_url:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    display_order: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const initialWebsiteContent: Record<string, WebsiteContent> = {
  home_hero: {
    id: "wc-001",
    section_key: "home_hero",
    title: "Empowering Strategic Decisions with High-Integrity Ground Intelligence",
    description:
      "Over a decade of leadership in qualitative field explorations, quantitative sampling, physical & mystery audits, and PAN India consumer panels.",
    content: {
      badge: "10+ Years of Field Excellence",
      primary_cta: "Explore Services",
      secondary_cta: "Join Field Panel",
      stats: [
        { label: "Years Experience", value: "10+" },
        { label: "Completed Projects", value: "1,200+" },
        { label: "Survey Responses", value: "2.5M+" },
        { label: "PAN India States & UTs", value: "28+8" },
      ],
    },
    image_url:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    updated_at: new Date().toISOString(),
  },
  why_choose_us: {
    id: "wc-002",
    section_key: "why_choose_us",
    title: "Why Global & National Brands Trust Brandum INC",
    description:
      "We combine rigorous statistical governance with battle-tested on-ground field execution.",
    content: {
      features: [
        {
          title: "Uncompromised Data Integrity",
          desc: "Triple-layer QA including GPS geo-stamping, 100% audio recording validation, and telephonic supervisor back-checks.",
        },
        {
          title: "PAN India Deep Reach",
          desc: "Active field teams across 28 States and 8 Union Territories capable of executing simultaneous multi-state studies in local dialects.",
        },
        {
          title: "Agile Turnaround Time",
          desc: "Streamlined CAPI mobile workflows and real-time cloud data pipelines delivering preliminary insights in as few as 72 hours.",
        },
        {
          title: "Dedicated Subject Experts",
          desc: "Specialized sector leads across Healthcare, FMCG, Agriculture, Public Policy, and Enterprise Tech.",
        },
        {
          title: "Ethical Respondent Treatment",
          desc: "Strict adherence to ESOMAR and MRSI guidelines with certified consent protocols and privacy safeguarding.",
        },
        {
          title: "Customized Methodologies",
          desc: "Bespoke hybrid research combining quantitative scale with nuanced ethnographic qualitative depth.",
        },
      ],
    },
    image_url: null,
    updated_at: new Date().toISOString(),
  },
  pan_india_presence: {
    id: "wc-003",
    section_key: "pan_india_presence",
    title: "Unrivaled PAN India Field Infrastructure",
    description:
      "From Tier-1 Metros to Remote Gram Panchayats across 28 States and 8 Union Territories",
    content: {
      regions: [
        {
          name: "Northern Hub",
          cities: "Delhi NCR, Lucknow, Chandigarh, Jaipur, Dehradun, Srinagar",
          field_strength: "450+ Field Investigators",
        },
        {
          name: "Western Hub",
          cities: "Mumbai, Pune, Ahmedabad, Surat, Indore, Nagpur",
          field_strength: "380+ Field Investigators",
        },
        {
          name: "Southern Hub",
          cities: "Bengaluru, Chennai, Hyderabad, Kochi, Coimbatore, Vizag",
          field_strength: "420+ Field Investigators",
        },
        {
          name: "Eastern Hub",
          cities: "Kolkata, Patna, Bhubaneswar, Ranchi, Guwahati, Agartala",
          field_strength: "350+ Field Investigators",
        },
      ],
    },
    image_url:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    updated_at: new Date().toISOString(),
  },
};

