'use client'
import '@/app/navbar.css';
import React, { useEffect, useState } from 'react';

interface MenuItem {
    slug: string;
    id: number;
    name: string;
    href: string;
    children: MenuItem[];
}

function Navbar() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [logo, setLogo] = useState<string>('');

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch('http://localhost/wordpress/wp-json/custom/v2/header-data');
                const data = await response.json();
                const modifiedLogo = data.replace(/href="http:\/\/localhost\/wordpress\//g, 'href="http://localhost:3000/');

                setLogo(modifiedLogo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHeaderData();
    }, []);

    return (
        <div>
            {/* Render the logo with modified HTML */}
            <div dangerouslySetInnerHTML={{ __html: logo }} />

            
        </div>
    );
}

export default Navbar;
