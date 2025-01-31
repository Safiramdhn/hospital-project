'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authMiddleware } from '../../middlewares/authMiddleware';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('Authorization');
            if (!token) {
                router.push('/login');
            } else {
                const isValidToken = authMiddleware(token);
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