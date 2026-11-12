"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  User,
  LogIn,
  Phone,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Don't show public navbar on admin dashboard pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0c1a40]/95 backdrop-blur-md shadow-lg py-3 text-white"
          : "bg-[#0c1a40] py-4 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:bg-blue-500 transition-colors">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                BRANDUM <span className="text-amber-400">INC</span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                Market Research & Field Operations
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                    isActive
                      ? "text-amber-400 border-b-2 border-amber-400 pb-1"
                      : "text-slate-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA / Join Panel */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 11 4982 7700</span>
            </Link>

            {user ? (
              <Link href="/join/dashboard">
                <Button
                  variant="gold"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/join/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-500 text-slate-200 hover:text-white hover:bg-slate-800"
                  >
                    <LogIn className="w-3.5 h-3.5 mr-1.5" />
                    Join Login
                  </Button>
                </Link>
                <Link href="/join/register">
                  <Button variant="gold" size="sm">
                    Join Panel
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-700/80 pb-6 space-y-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                      isActive
                        ? "bg-blue-900/60 text-amber-400"
                        : "text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-700/80 flex flex-col gap-2.5">
              {user ? (
                <Link href="/join/dashboard">
                  <Button variant="gold" className="w-full justify-center">
                    <User className="w-4 h-4 mr-2" />
                    Open User Dashboard
                  </Button>
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/join/login">
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-white hover:bg-slate-800"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/join/register">
                    <Button variant="gold" className="w-full">
                      Join Panel
                    </Button>
                  </Link>
                </div>
              )}

              <div className="text-center pt-2">
                <Link
                  href="/admin/login"
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Super Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

