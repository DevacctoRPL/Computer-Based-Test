import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

interface UseAuthReturn {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (niu: number, sandi: string) => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // const localAPI = 'http://localhost:7772';
  const devTunnelAPI = 'https://49kdgk28-7774.asse.devtunnels.ms';

  const login = async (niu: number, sandi: string) => {
    setLoading(true);
    setError(null);

    console.log('Sending niu:', niu);
    console.log('Sending Password:', sandi);

    try {
      const response = await axios.post(`${devTunnelAPI}/api/auth`, { niu, sandi });
      const { token } = response.data;

      // Check if token is expired
      const decodedToken = jwt.decode(token) as { exp: number };
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        throw new Error('Token expired');
      }

      // Save token to local storage
      localStorage.setItem('token', token);
      setIsAuthenticated(true);

      // Redirect to dashboard
      navigate('/');
    } catch (err: any) {
      console.error('Error during login:', err);
      setError(err.response?.data?.message || 'Login failed');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAuthenticated, loading, error, login };
};

export default useAuth;
