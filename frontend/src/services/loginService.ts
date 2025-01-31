import apiClient from "@/utils/apiClient";

export const LoginService = {
    login: async function(email: string, password: string): Promise<any> {
      try {
        const response = await apiClient.login(email, password);
        return response.data;
      } catch (error) {
        throw error;
      }
    }

}

