var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // const localAPI = 'http://localhost:7772';
    const devTunnelAPI = 'https://49kdgk28-7772.asse.devtunnels.ms';
    const login = (nis, sandi) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        setLoading(true);
        setError(null);
        console.log('Sending NIS:', nis);
        console.log('Sending Password:', sandi);
        try {
            const response = yield axios.post(`${devTunnelAPI}/api/auth`, { nis, sandi });
            const { token } = response.data;
            // Check if token is expired
            const decodedToken = jwt.decode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                throw new Error('Token expired');
            }
            // Save token to local storage
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            // Redirect to dashboard
            navigate('/');
        }
        catch (err) {
            console.error('Error during login:', err);
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Login failed');
            setIsAuthenticated(false);
        }
        finally {
            setLoading(false);
        }
    });
    return { isAuthenticated, loading, error, login };
};
export default useAuth;
