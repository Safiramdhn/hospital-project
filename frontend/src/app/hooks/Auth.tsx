'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '../../../utils/token';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('Authorization');
            if (!token) {
                router.push('/login');
            } else {
                const isValidToken = validateToken(token);
                if (!isValidToken) {
                    localStorage.removeItem('Authorization');
                    router.push('/login');
                } else {
                    setIsAuthenticated(true);
                }
            }
        }
    }, [router]);
    return isAuthenticated;
};

export default useAuth;