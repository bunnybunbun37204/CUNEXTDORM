import { Button } from "@/components/ui/button";
import { trpc, trpcClient } from "@/lib/trpc-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export function Login() {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<LoginForm />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export function LoginForm() {
	const url = trpc.authApplication.getUrl.useQuery();
	const onLogin = () => {
		console.log("Login clicked, url: ", url.data);
		window.location.href = url.data || "";
	};
	return (
		// <div className="flex flex-col">
		// 	<img src="/MadongLogo.png" alt="Madong logo" className="-mt-12 h-80 w-80 self-center" />
		// 	<div className="flex flex-col -mt-8 mx-4 relative">
		// 		<div className="inline-flex">
		// 			<div className="bg-white rounded-2xl p-4 w-1/2 pb-12 px-6">
		// 				<h1 className="font-bold text-2xl">Sign in</h1>
		// 				<h3>to your account</h3>
		// 			</div>
		// 			<div className="w-1/2 flex justify-center">
		// 				<img src="/logoChula.png" alt="logo chulalongkorn" className="h-14 mt-4" />
		// 			</div>
		// 		</div>
		// 		{/* Form Section */}

		// 		<Button variant="outline" className="w-full rounded-lg h-11 text-md gap-2 hover:bg-gray-50" onClick={onLogin}>
		// 			Sign in with Google
		// 		</Button>
		// 	</div>
		// </div>
		<div className="flex flex-col">
			<img src="/MadongLogo.png" alt="Madong logo" className="-mt-12 h-80 w-80 self-center" />
			<div className="flex flex-col -mt-8 mx-4 relative">
				<div className="inline-flex">
					<div className="bg-white rounded-2xl p-4 w-1/2 pb-12 px-6">
						<h1 className="font-bold text-2xl">Sign in</h1>
						<h3>to your account</h3>
					</div>
					<div className="w-1/2 flex justify-center">
						<img src="/logoChula.png" alt="logo chulalongkorn" className="h-14 mt-4" />
					</div>
				</div>
				{/* Form Section */}
				<div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm absolute w-full top-22 pb-12">
					{/* Login Button */}
					<Button className="w-full rounded-lg h-11 text-md " onClick={onLogin}>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
}
