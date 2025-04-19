import { cn } from "@/lib/utils";
import { Bell, House, Receipt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const navItems = [
	{ id: "bill", label: "Bill", icon: Receipt, href: "/bill" },
	{ id: "home", label: "Home", icon: House, href: "/" },
	{ id: "notifications", label: "Alerts", icon: Bell, href: "/notifications" },
];

export const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className }, ref) => {
	const pathname = usePathname();

	return (
		<footer
			ref={ref}
			className={cn(
				"z-50 fixed -bottom-1 left-1/2 -translate-x-1/2 w-[448px] max-w-[448px] h-20 bg-black backdrop-blur-lg rounded-t-xl shadow-2xl border-t border-gray-200/60",
				className,
			)}
			aria-label="Footer Navigation"
		>
			{/* Buttons */}
			<div className="relative h-full flex justify-between items-center px-12">
				{navItems.map(({ id, label, icon: Icon, href }) => (
					<Link
						key={id}
						href={href}
						className={cn(
							"flex flex-col items-center gap-1 transition-all",
							pathname === id ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-400",
						)}
						aria-current={pathname === id ? "page" : undefined}
					>
						<Icon className={cn("w-6 h-6", pathname === id && "stroke-[2.5]")} />
						<span className="text-xs font-medium">{label}</span>
					</Link>
				))}
			</div>
		</footer>
	);
});
