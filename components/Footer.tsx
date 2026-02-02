// components/footer.tsx
'use client';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import Link from 'next/link';
import {
  MessageCircle,
  ExternalLink,
  Book,
  Users,
  Briefcase,
  Building,
  Headphones,
  Award,
  GraduationCap,
  Globe,
  Zap,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Product Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                'AI Email Automation',
                'Conversation Inbox',
                'Workflow Builder',
                'Template Library',
                'Analytics Dashboard',
                'API and Integrations',
                'Roadmap'
              ].map((item) => {
                const slug = item.toLowerCase().replace(/\s+/g, '-').replace(/[\/&]/g, '');
                return (
                  <li key={item}>
                    <Link 
                      href={`/product/${slug}`}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors flex items-center gap-1 group"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Documentation', icon: Book },
                { label: 'Blog', icon: Book },
                { label: 'Pricing', icon: Award },
                { label: 'Case Studies', icon: Briefcase },
                { label: 'Video Tutorials', icon: GraduationCap },
                { label: 'Demo Booking', icon: Globe },
                { label: 'Status Page', icon: Zap },
                { label: 'System Changelog', icon: ExternalLink }
              ].map((item) => {
                const slug = item.label.toLowerCase().replace(/\s+/g, '-').replace(/[\/&]/g, '');
                return (
                  <li key={item.label}>
                    <Link 
                      href={`/resources/${slug}`}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <item.icon className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', icon: Building },
                { label: 'Careers', icon: Briefcase },
                { label: 'Partner Program', icon: Users },
                { label: 'Contact Support', icon: Headphones },
                { label: 'Investor Relations', icon: Award },
                { label: 'press-/-media-kit', icon: Book }
              ].map((item) => {
                const slug = item.label.toLowerCase().replace(/\s+/g, '-').replace(/[\/&]/g, '');
                return (
                  <li key={item.label}>
                    <Link 
                      href={`/company/${slug}`}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <item.icon className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                'Privacy Policy',
                'TermsConditions',
                'Refund Policy',
                'Anti-Spam Policy',
                'Data Retention Policy',
                'Responsible Messaging Policy'
              ].map((item) => {
                const slug = item.toLowerCase().replace(/\s+/g, '-').replace(/[\/&]/g, '');
                return (
                  <li key={item}>
                    <Link
                      href={`/legal/${slug}`}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Sales */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Sales
            </h3>
            <div className="space-y-6">
              {/* Phone */}
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <div className="space-y-1 ml-6">
                  <a 
                    href="tel:7004614077" 
                    className="text-gray-700 hover:text-gray-900 text-sm block transition-colors"
                  >
                   +91 7004614077
                  </a>
                  <a 
                    href="tel:7004614077" 
                    className="text-gray-700 hover:text-gray-900 text-sm block transition-colors"
                  >
                    +91 7004614077
                  </a>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <a 
                  href="mailto:sales@vaiket.com" 
                  className="text-gray-700 hover:text-gray-900 text-sm ml-6 block transition-colors"
                >
                  sales@vaiket.com
                </a>
              </div>

              {/* Support */}
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Headphones className="w-4 h-4" />
                  <span className="text-sm font-medium">Support</span>
                </div>
                <button className="text-gray-700 hover:text-gray-900 text-sm ml-6 flex items-center gap-1 transition-colors group">
                  <span>Talk to Concierge</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Vaiket</span>
                <p className="text-xs text-gray-500 mt-0.5">
                  AI Communication Platform
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, href: "https://facebook.com/vaiket", label: "Facebook" },
                { icon: FaInstagram, href: "https://instagram.com/vaiket", label: "Instagram" },
                { icon: FaLinkedinIn, href: "https://linkedin.com/company/vaiket", label: "LinkedIn" },
                { icon: FaYoutube, href: "https://youtube.com/vaiket", label: "YouTube" },
                { icon: FaTwitter, href: "https://twitter.com/vaiket", label: "Twitter" },
                { icon: FaPinterestP, href: "https://pinterest.com/vaiket", label: "Pinterest" },
                { icon: MessageCircle, href: "https://t.me/vaiket", label: "Telegram" },
                { icon: MessageSquare, href: "https://wa.me/+917004614077", label: "WhatsApp" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Legal & Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                © {currentYear} Vaiket. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 text-xs text-gray-500">
                <Link href="/legal/privacy-policy" className="hover:text-gray-700">
                  Privacy Policy
                </Link>
                <Link href="/legal/termsconditions" className="hover:text-gray-700">
                  Terms & Conditions
                </Link>
                <Link href="/legal/refund-policy" className="hover:text-gray-700">
                  Refund Policy
                </Link>
                <Link href="/legal/anti-spam-policy" className="hover:text-gray-700">
                  Anti-Spam Policy
                </Link>
                <Link href="/legal/data-retention-policy" className="hover:text-gray-700">
                  Data Retention Policy
                </Link>
                <Link href="/legal/responsible-messaging-policy" className="hover:text-gray-700">
                  Responsible Messaging Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Backlink Section - For SEO */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="text-center text-xs text-gray-500 space-y-2">
            <p>
              Vaiket - AI-powered communication automation platform for businesses. 
              Advanced email marketing, WhatsApp CRM, Instagram DM automation, and multi-channel messaging solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span>📍 Ranchi, Jharkhand, India</span>
              <span>📧 support@vaiket.com</span>
              <span>📞 +91 70046 14077</span>
            </div>
            <p className="mt-4">
              #AIEmailMarketing #WhatsAppAutomation #InstagramDMAutomation #BusinessCommunication 
              #MarketingAutomation #CRMSolutions #EmailMarketingSoftware #ConversationalAI
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/+917004614077"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <div className="flex flex-col items-center">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Chat</span>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;