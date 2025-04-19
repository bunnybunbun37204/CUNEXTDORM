import axios, { type AxiosInstance } from "axios";
// infrastructure/protocol/http/axios-http-client.ts
import { injectable } from "inversify";
import type { HttpClient } from "./http-client";

@injectable()
export class AxiosHttpClient implements HttpClient {
	private readonly axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			timeout: 10000,
			headers: {
				"User-Agent": "Your-App-Name/1.0.0",
			},
		});
	}

	async post<T>(url: string, headers?: Record<string, string>): Promise<{ status: number; data: T }> {
		try {
			const response = await this.axiosInstance.post<T>(url, {}, { headers });
			return { status: response.status, data: response.data };
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(`HTTP Error: ${error.response?.status} - ${error.message}`);
			}
			throw new Error("Unknown HTTP error occurred");
		}
	}
}
