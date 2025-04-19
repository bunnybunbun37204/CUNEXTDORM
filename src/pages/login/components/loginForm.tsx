import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm() {
	return (
		<div className="flex flex-col">
			<img src="/src/assets/MadongLogo.png" alt="Madong logo" className="-mt-12 h-80 w-80 self-center" />
			<div className="flex flex-col -mt-8 mx-4 relative">
				<div className="inline-flex">
					<div className="bg-white rounded-2xl p-4 w-1/2 pb-12 px-6">
						<h1 className="font-bold text-2xl">Sign in</h1>
						<h3>to your account</h3>
					</div>
					<div className="w-1/2 flex justify-center">
						<img src="/src/assets/logoChula.png" alt="logo chulalongkorn" className="h-14 mt-4" />
					</div>
				</div>
				{/* Form Section */}
				<form className="bg-white rounded-2xl p-6 space-y-6 shadow-sm absolute w-full top-22 pb-12">
					<div className="space-y-4">
						{/* Email Input */}
						<div className="space-y-2">
							<Label htmlFor="email" className="text-gray-700">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="email@student.chula.ac.th"
								className="rounded-lg focus-visible:ring-primary"
							/>
						</div>

						{/* Password Input */}
						<div className="space-y-2">
							<Label htmlFor="password" className="text-gray-700">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								className="rounded-lg focus-visible:ring-primary"
							/>
						</div>
					</div>

					{/* Login Button */}
					<Button type="submit" className="w-full rounded-lg h-11 text-md">
						Login
					</Button>

					{/* Separator */}
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">Or continue with</span>
						</div>
					</div>

					{/* Social Login */}
					<Button variant="outline" className="w-full rounded-lg h-11 text-md gap-2 hover:bg-gray-50">
						Sign in with Google
					</Button>
				</form>
			</div>
		</div>
	);
}
