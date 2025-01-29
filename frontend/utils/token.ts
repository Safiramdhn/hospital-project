import jwt from 'jsonwebtoken';

// Function to check token expiration
export function validateToken(token: string): boolean {
    try {
        if (!token) {
            throw new Error('Token not provided');
        }

        // Decode the token without verifying the signature
        const decoded: any = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            throw new Error('Invalid token or no expiration field');
        }

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            throw new Error('Token expired');
        }

        return true;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
}
