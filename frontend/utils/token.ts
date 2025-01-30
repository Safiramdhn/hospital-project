import jwt from 'jsonwebtoken';

// Function to check token expiration
export function validateToken(token: string): boolean {
    try {
        if (!token) {
            console.log('Token not provided');
            return false
        }

        // Decode the token without verifying the signature
        const decoded: any = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            console.log('Invalid token or no expiration field');
            return false
        }

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            console.log('Token expired');
            return false
        }

        return true;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
}
