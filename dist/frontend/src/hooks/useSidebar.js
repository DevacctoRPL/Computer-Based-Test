import { useState } from 'react';
export const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    return { isOpen, toggleSidebar };
};
