import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UseAuthReturn {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (nis: number, sandi: string) => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const localAPI = 'http://localhost:7772';
  const devTunnelAPI = 'https://49kdgk28-7772.asse.devtunnels.ms'

  const login = async (nis: number, sandi: string) => {
    setLoading(true);
    setError(null);

    console.log('Sending NIS:', nis);
    console.log('Sending Password:', sandi);

    try {
      const response = await axios.post(`${localAPI}/api/auth`, { nis, sandi });
      const { token } = response.data;

      // Save token to local storage
      localStorage.setItem('token', token);
      setIsAuthenticated(true);

      // Redirect to dashboard
      navigate('/dashboard');
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



// https://49kdgk28-7772.asse.devtunnels.ms/api/auth
