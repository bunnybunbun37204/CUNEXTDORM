// infrastructure/protocols/http.client.ts
export interface HttpClient {
	post<T>(
		url: string,
		headers?: Record<string, string>,
	): Promise<{
		status: number;
		data: T;
	}>;
	// เพิ่ม methods อื่นๆ ตามต้องการ
}
