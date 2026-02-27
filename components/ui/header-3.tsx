'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	GlobeIcon,
	Mail,
	MessageSquare,
	Smartphone,
	Megaphone,
	Users,
	Building2,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BookOpen,
	BriefcaseBusiness,
	ArrowRight,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
	iconClassName?: string;
	iconContainerClassName?: string;
};

export default function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
				<div className="flex items-center gap-5">
					<Link
						href="/"
						className="group inline-flex items-center rounded-md px-2 py-1.5 transition hover:bg-accent/70"
						aria-label="Vaiket home"
					>
						<span className="text-lg font-black tracking-[-0.02em] text-slate-900 dark:text-slate-100">
							Vaiket
						</span>
						<span className="text-lg font-black tracking-[-0.02em] text-cyan-600 dark:text-cyan-400">
							.com
						</span>
					</Link>

					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium text-slate-800 hover:bg-transparent hover:text-cyan-600 focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-cyan-700 dark:text-slate-200 dark:hover:text-cyan-400 dark:data-[state=open]:text-cyan-400">
									Product
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5">
									<ul className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
										{productLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-2">
										<p className="text-muted-foreground text-sm">
											Interested?{' '}
											<a href="#" className="text-foreground font-medium hover:underline">
												Schedule a demo
											</a>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium text-slate-800 hover:bg-transparent hover:text-cyan-600 focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-cyan-700 dark:text-slate-200 dark:hover:text-cyan-400 dark:data-[state=open]:text-cyan-400">
									Academy
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<ul className="bg-popover w-[320px] space-y-2 rounded-md border p-2 shadow">
										{academyLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium text-slate-800 hover:bg-transparent hover:text-cyan-600 focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-cyan-700 dark:text-slate-200 dark:hover:text-cyan-400 dark:data-[state=open]:text-cyan-400">
									Businesses
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<ul className="bg-popover w-[380px] space-y-2 rounded-md border p-2 shadow">
										{businessLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium text-slate-800 hover:bg-transparent hover:text-cyan-600 focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-cyan-700 dark:text-slate-200 dark:hover:text-cyan-400 dark:data-[state=open]:text-cyan-400">
									Company
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<div className="grid w-lg grid-cols-2 gap-2">
										<ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2 p-3">
											{companyLinks2.map((item, i) => (
												<li key={i}>
														<NavigationMenuLink
															href={item.href}
															className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
														>
															<item.icon className={cn('size-4', item.iconClassName ?? 'text-foreground')} />
															<span className="font-medium">{item.title}</span>
														</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline" asChild>
						<Link href="/get-started">
							Sign In
						</Link>
					</Button>
					<Link
						href="/business/identity"
						className="group relative inline-flex h-10 min-w-[242px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-700 px-4 shadow-[0_10px_24px_-16px_rgba(6,182,212,0.58)] transition-transform duration-200 hover:-translate-y-0.5"
					>
						<span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-white">
							Get Listed Now - Rs. 99 + GST
							<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					</Link>
				</div>


				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
						<div className="flex w-full flex-col gap-y-2">
							<span className="text-sm">Product</span>
							{productLinks.map((link) => (
								<ListItem key={link.title} {...link} />
							))}
							<span className="text-sm">Academy</span>
							{academyLinks.map((link) => (
								<ListItem key={link.title} {...link} />
							))}
							<span className="text-sm">Businesses</span>
							{businessLinks.map((link) => (
								<ListItem key={link.title} {...link} />
							))}
							<span className="text-sm">Company</span>
							{companyLinks.map((link) => (
								<ListItem key={link.title} {...link} />
							))}
							{companyLinks2.map((link) => (
								<ListItem key={link.title} {...link} />
							))}
						</div>
					</NavigationMenu>
				<div className="flex flex-col gap-2 md:hidden">
					<Button variant="outline" asChild className="w-full">
						<Link href="/get-started">
							Sign In
						</Link>
					</Button>
					<Link
						href="/business/identity"
						className="group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-700 px-4 shadow-[0_10px_24px_-16px_rgba(6,182,212,0.58)] transition-transform duration-200 hover:-translate-y-0.5"
					>
						<span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-white">
							Get Listed Now - Rs. 99 + GST
							<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					</Link>
				</div>

			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	iconClassName,
	iconContainerClassName,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2', className)} {...props} asChild>
			<a href={href}>
				<div className={cn(
					'flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm',
					iconContainerClassName ?? 'bg-background/40',
				)}>
					<Icon className={cn('size-5 text-foreground', iconClassName)} />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium">{title}</span>
					<span className="text-muted-foreground text-xs">{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const productLinks: LinkItem[] = [
	{
		title: 'AI Email Automation',
		href: '/product/ai-email-automation',
		description: 'Automate inbound replies and follow-ups',
		icon: Mail,
		iconClassName: 'text-sky-600 dark:text-sky-400',
		iconContainerClassName: 'bg-sky-50 border-sky-200 dark:bg-sky-950/35 dark:border-sky-800/60',
	},
	{
		title: 'Whatsapp Automation',
		href: '/product/whatsapp',
		description: 'Broadcast, chatbot, and auto support flows',
		icon: MessageSquare,
		iconClassName: 'text-emerald-600 dark:text-emerald-400',
		iconContainerClassName: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/35 dark:border-emerald-800/60',
	},
	{
		title: 'Website Development',
		href: '/product/website',
		description: 'Conversion-focused business websites',
		icon: GlobeIcon,
		iconClassName: 'text-indigo-600 dark:text-indigo-400',
		iconContainerClassName: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/35 dark:border-indigo-800/60',
	},
	{
		title: 'Digital Marketing',
		href: '/product/digital-marketing',
		description: 'Run campaigns and improve ROI with analytics',
		icon: Megaphone,
		iconClassName: 'text-amber-600 dark:text-amber-400',
		iconContainerClassName: 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/60',
	},
	{
		title: 'SMS & RCS',
		href: '/product/sms-and-rcs',
		description: 'Reach customers with instant mobile messaging',
		icon: Smartphone,
		iconClassName: 'text-violet-600 dark:text-violet-400',
		iconContainerClassName: 'bg-violet-50 border-violet-200 dark:bg-violet-950/35 dark:border-violet-800/60',
	},
	{
		title: 'CRM & Leads',
		href: '/product/crm-and-leads',
		description: 'Capture, assign, and track every lead',
		icon: Users,
		iconClassName: 'text-cyan-600 dark:text-cyan-400',
		iconContainerClassName: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/35 dark:border-cyan-800/60',
	},
];

const companyLinks: LinkItem[] = [
	{
		title: 'About Us',
		href: 'https://www.vaiket.com/company/about-us',
		description: 'Learn more about our story and team',
		icon: Users,
		iconClassName: 'text-cyan-600 dark:text-cyan-400',
		iconContainerClassName: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/35 dark:border-cyan-800/60',
	},
	{
		title: 'Customer Stories',
		href: 'https://www.vaiket.com/resources/case-studies',
		description: 'See how we have helped our clients succeed',
		icon: Star,
		iconClassName: 'text-amber-600 dark:text-amber-400',
		iconContainerClassName: 'bg-amber-50 border-amber-200 dark:bg-amber-950/35 dark:border-amber-800/60',
	},
	{
		title: 'Partnerships',
		href: 'https://www.vaiket.com/company/partner-program',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
		iconClassName: 'text-emerald-600 dark:text-emerald-400',
		iconContainerClassName: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/35 dark:border-emerald-800/60',
	},
];
const companyLinks2: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: 'https://www.vaiket.com/legal/termsconditions',
		icon: FileText,
		iconClassName: 'text-slate-600 dark:text-slate-300',
	},
	{
		title: 'Privacy Policy',
		href: 'https://www.vaiket.com/legal/privacy-policy',
		icon: Shield,
		iconClassName: 'text-emerald-600 dark:text-emerald-400',
	},
	{
		title: 'Refund Policy',
		href: 'https://www.vaiket.com/legal/refund-policy',
		icon: RotateCcw,
		iconClassName: 'text-orange-600 dark:text-orange-400',
	},
	{
		title: 'Blog',
		href: 'https://www.vaiket.com/resources/blog',
		icon: Leaf,
		iconClassName: 'text-lime-600 dark:text-lime-400',
	},
	{
		title: 'Help Center',
		href: 'https://www.vaiket.com/company/contact-support',
		icon: HelpCircle,
		iconClassName: 'text-indigo-600 dark:text-indigo-400',
	},
];
const academyLinks: LinkItem[] = [
	{
		title: 'Internship',
		href: '/academy/internship',
		description: 'Hands-on practical internship programs',
		icon: BriefcaseBusiness,
		iconClassName: 'text-violet-600 dark:text-violet-400',
		iconContainerClassName: 'bg-violet-50 border-violet-200 dark:bg-violet-950/35 dark:border-violet-800/60',
	},
	{
		title: 'Course',
		href: '/academy/course',
		description: 'Learn job-ready skills with guided courses',
		icon: BookOpen,
		iconClassName: 'text-blue-600 dark:text-blue-400',
		iconContainerClassName: 'bg-blue-50 border-blue-200 dark:bg-blue-950/35 dark:border-blue-800/60',
	},
];
const businessLinks: LinkItem[] = [
	{
		title: 'Vaiket Business Identity Program',
		href: '/business/identity',
		description: 'Get listed, verified, and discoverable on Vaiket',
		icon: Building2,
		iconClassName: 'text-teal-600 dark:text-teal-400',
		iconContainerClassName: 'bg-teal-50 border-teal-200 dark:bg-teal-950/35 dark:border-teal-800/60',
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);
	const frameRef = React.useRef<number | null>(null);
	const onScroll = React.useCallback(() => {
		const next = window.scrollY > threshold;
		setScrolled((prev) => (prev === next ? prev : next));
	}, [threshold]);

	React.useEffect(() => {
		const listener = () => {
			if (frameRef.current !== null) return;
			frameRef.current = window.requestAnimationFrame(() => {
				frameRef.current = null;
				onScroll();
			});
		};
		window.addEventListener('scroll', listener, { passive: true });
		return () => {
			window.removeEventListener('scroll', listener);
			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current);
			}
		};
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}

