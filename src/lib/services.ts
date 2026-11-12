import { publicClient } from "@/lib/supabase/public";
import {
  initialCompanyProfile,
  initialServices,
  initialIndustries,
  initialWebsiteContent,
} from "@/lib/data";
import { Service, Industry, CompanyProfile, WebsiteContent } from "@/types/database.types";

export async function getCompanyProfile(): Promise<CompanyProfile> {
  try {
    const { data, error } = await publicClient
      .from("company_profiles")
      .select("*")
      .maybeSingle();

    if (!error && data) {
      return data as CompanyProfile;
    }
  } catch {
    // fallback to statically bundled profile
  }
  return initialCompanyProfile;
}

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await publicClient
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Service[];
    }
  } catch {
    // fallback to initial 17 services
  }
  return initialServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data, error } = await publicClient
      .from("services")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return data as Service;
    }
  } catch {
    // fallback
  }
  return initialServices.find((s) => s.slug === slug) || null;
}

export async function getIndustries(): Promise<Industry[]> {
  try {
    const { data, error } = await publicClient
      .from("industries")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Industry[];
    }
  } catch {
    // fallback to initial 11 industries
  }
  return initialIndustries;
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  try {
    const { data, error } = await publicClient
      .from("industries")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return data as Industry;
    }
  } catch {
    // fallback
  }
  return initialIndustries.find((i) => i.slug === slug) || null;
}

export async function getWebsiteContent(sectionKey: string): Promise<WebsiteContent | null> {
  try {
    const { data, error } = await publicClient
      .from("website_content")
      .select("*")
      .eq("section_key", sectionKey)
      .maybeSingle();

    if (!error && data) {
      return data as WebsiteContent;
    }
  } catch {
    // fallback
  }
  return initialWebsiteContent[sectionKey] || null;
}
