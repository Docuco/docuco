import { useEffect, useState } from "react";

export function useScreenSize() {
    let [isMobile, setIsMobile] = useState(false);
    let [isTablet, setIsTablet] = useState(false);
    let [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
            setIsDesktop(window.innerWidth >= 1024);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
}