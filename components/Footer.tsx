"use client";

import Link from "next/link";
import Image from "next/image";
import McaIncorporationBadge from "@/components/McaIncorporationBadge";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  ArrowRight,
  Award,
  Book,
  Briefcase,
  Building,
  ExternalLink,
  Globe,
  GraduationCap,
  Headphones,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

type SectionLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

type SocialLink = {
  label: string;
  href: string;
  icon: IconType | LucideIcon;
};

const productLinks: SectionLink[] = [
  { label: "AI Email Automation", href: "/product/ai-email-automation" },
  { label: "Conversation Inbox", href: "/product/conversation-inbox" },
  { label: "Workflow Builder", href: "/product/workflow-builder" },
  { label: "Template Library", href: "/product/template-library" },
  { label: "Analytics Dashboard", href: "/product/analytics-dashboard" },
  { label: "API and Integrations", href: "/product/api-and-integrations" },
  { label: "Roadmap", href: "/product/roadmap" },
];

const resourceLinks: SectionLink[] = [
  { label: "Documentation", href: "/resources/documentation", icon: Book },
  { label: "Blog", href: "/resources/blog", icon: Book },
  { label: "Pricing", href: "/resources/pricing", icon: Award },
  { label: "Case Studies", href: "/resources/case-studies", icon: Briefcase },
  { label: "Video Tutorials", href: "/resources/video-tutorials", icon: GraduationCap },
  { label: "Demo Booking", href: "/resources/demo-booking", icon: Globe },
  { label: "Status Page", href: "/resources/status-page", icon: Zap },
  { label: "System Changelog", href: "/resources/system-changelog", icon: ExternalLink },
];

const companyLinks: SectionLink[] = [
  { label: "About Us", href: "/company/about-us", icon: Building },
  { label: "Careers", href: "/company/careers", icon: Briefcase },
  { label: "Partner Program", href: "/company/partner-program", icon: Users },
  { label: "Contact Support", href: "/company/contact-support", icon: Headphones },
  { label: "Investor Relations", href: "/company/investor-relations", icon: Award },
  { label: "Press and Media Kit", href: "/company/press-/-media-kit", icon: Book },
];

const legalLinks: SectionLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms and Conditions", href: "/legal/termsconditions" },
  { label: "Refund Policy", href: "/legal/refund-policy" },
  { label: "Anti-Spam Policy", href: "/legal/anti-spam-policy" },
  { label: "Data Retention Policy", href: "/legal/data-retention-policy" },
  { label: "Responsible Messaging Policy", href: "/legal/responsible-messaging-policy" },
];

const socialLinks: SocialLink[] = [
  { icon: FaFacebookF, href: "https://facebook.com/vaiket", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com/vaiket", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/company/vaiket", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://youtube.com/vaiket", label: "YouTube" },
  { icon: FaTwitter, href: "https://twitter.com/vaiket", label: "Twitter" },
  { icon: FaPinterestP, href: "https://pinterest.com/vaiket", label: "Pinterest" },
  { icon: MessageCircle, href: "https://t.me/vaiket", label: "Telegram" },
  { icon: MessageSquare, href: "https://wa.me/+917004614077", label: "WhatsApp" },
];

function LinkSection({ title, links }: { title: string; links: SectionLink[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-300">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              {link.icon && <link.icon className="h-3.5 w-3.5 text-slate-500 transition group-hover:text-cyan-300" />}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#04070f] text-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(16,185,129,0.11),transparent_32%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
        <div className="mb-10 rounded-3xl border border-slate-700/70 bg-gradient-to-r from-cyan-900/30 via-slate-900 to-emerald-900/25 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-200">Ready to scale</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Build your complete communication system with Vaiket
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                Go from scattered tools to one growth engine for website, leads, campaigns, and customer messaging.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-slate-100"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/+917004614077"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/70 bg-emerald-400/10 px-5 py-3 text-sm font-extrabold text-emerald-100 transition hover:bg-emerald-400/15"
              >
                Talk on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-b border-slate-800 pb-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:row-span-2">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo/vaiket-premium.svg"
                  alt="Vaiket"
                  width={520}
                  height={140}
                  className="h-10 w-auto"
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                AI-powered communication automation platform for modern businesses.
              </p>

              <div className="mt-5 grid gap-2.5 text-sm text-slate-300">
                <a href="tel:+917004614077" className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-cyan-300" />
                  +91 70046 14077
                </a>
                <a href="mailto:sales@vaiket.com" className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-cyan-300" />
                  sales@vaiket.com
                </a>
                <p className="inline-flex items-center gap-2 text-slate-400">
                  <Globe className="h-4 w-4 text-cyan-300" />
                  Ranchi, Jharkhand, India
                </p>
              </div>

              <div className="mt-5">
                <McaIncorporationBadge />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <LinkSection title="Product" links={productLinks} />
          </div>

          <div className="lg:col-span-2">
            <LinkSection title="Resources" links={resourceLinks} />
          </div>

          <div className="lg:col-span-2">
            <LinkSection title="Company" links={companyLinks} />
          </div>

          <div className="lg:col-span-2">
            <LinkSection title="Legal" links={legalLinks} />
          </div>

          <div className="md:col-span-2 lg:col-span-8 lg:col-start-5">
            <div className="ml-0 grid w-full max-w-3xl grid-cols-3 items-start justify-items-center gap-x-2 gap-y-4 sm:gap-x-6 lg:ml-auto lg:gap-x-8">
              <div className="flex w-full flex-col items-center gap-2 text-center">
                <Image
                  src="/badges/mca-incorporation-badge.png"
                  alt="MCA incorporation certification badge"
                  width={300}
                  height={300}
                  className="h-24 w-24 object-contain drop-shadow-[0_10px_32px_rgba(251,191,36,0.26)] sm:h-32 sm:w-32 lg:h-[10.8rem] lg:w-[10.8rem]"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  MCA Incorporated
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-2 text-center">
                <Image
                  src="/badges/msme-badge.png"
                  alt="MSME registered badge"
                  width={300}
                  height={300}
                  className="h-24 w-24 object-contain drop-shadow-[0_10px_32px_rgba(168,85,247,0.26)] sm:h-32 sm:w-32 lg:h-[10.8rem] lg:w-[10.8rem]"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  MSME Registered
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-2 text-center">
                <Image
                  src="/badges/startup-india-badge.png"
                  alt="Startup India recognized startup badge"
                  width={248}
                  height={248}
                  className="h-20 w-20 object-contain drop-shadow-[0_10px_32px_rgba(251,191,36,0.26)] sm:h-28 sm:w-28 lg:h-36 lg:w-36"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Startup India
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <p className="text-sm text-slate-400">Copyright {currentYear} Vaiket. All rights reserved.</p>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <p className="text-xs text-slate-500">
                AI email marketing, WhatsApp automation, and multi-channel communication workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
