import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Header = React.forwardRef<HTMLInputElement, InputProps>(({ className }) => {
	return (
		<header
			className={cn("z-50 h-24 fixed w-[448px] top-0 flex items-center justify-center bg-black text-white", className)}
		>
			<img src="/logoChula.png" alt="logo chulalongkorn" />
		</header>
	);
});
