import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

class ApiClient {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
            timeout: 10000, // 10 seconds
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Request interceptor to attach auth token
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("Authorization");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for global error handling
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                const errorMessage = this.handleError(error);
                return Promise.reject(new Error(errorMessage));
            }
        );
    }

    // Centralized error handling
    private handleError(error: unknown): string {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { status, data } = error.response;
                console.error(`HTTP Error ${status}:`, data || "No additional details");

                const errorMessages: Record<number, string> = {
                    400: "Bad Request: Please check your input.",
                    401: "Unauthorized: Please log in again.",
                    403: "Forbidden: You do not have permission to access this resource.",
                    404: "Not Found: The requested resource could not be found.",
                    500: "Server Error: Please try again later.",
                };

                return errorMessages[status] || `Unexpected Error (${status}): Please try again.`;
            }

            if (error.request) {
                console.error("Network Error: No response received from the server.", error);
                return "Network error: Unable to reach the server. Please check your connection.";
            }
        }

        if (error instanceof Error) {
            console.error("Request Error:", error.message);
            return `Error: ${error.message}`;
        }

        console.error("Unknown Error:", error);
        return "An unexpected error occurred. Please try again.";
    }

    // Login employee request
    async login<T>(email: string, password: string): Promise<AxiosResponse<T>> {
        return this.instance.post<T>("/auth/login", { email, password });
    }

    // get employee profile request
    async getEmployeeProfile<T>(): Promise<AxiosResponse<T>> {
        return this.instance.get<T>("/employee/profile");
    }
}

const apiClient = new ApiClient();
export default apiClient;
