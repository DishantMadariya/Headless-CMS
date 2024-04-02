'use client'
import '@/app/navbar.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
    const [bgimage, setBgImage] = useState<string>('');

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch('http://localhost/wordpress/wp-json/custom/v2/combined-data');
                const data = await response.json();

                const modifiedMenuItems = data.menu.map((menuItem: MenuItem) => ({
                    ...menuItem,
                    href: menuItem.href.replace('http://localhost/wordpress/', 'http://localhost:3000/'),
                    children: menuItem.children.map((childItem: MenuItem) => ({
                        ...childItem,
                        href: childItem.href.replace('http://localhost/wordpress/', 'http://localhost:3000/')
                    }))
                }));

                setMenuItems(modifiedMenuItems);
                setLogo(data.logo_url);
                setBgImage(data.header_background_image_url);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHeaderData();
    }, []);

    return (
        <div className='container mb-10'>
            {menuItems.length === 0 ? (
                <div className='my-10 container'>
                    <div className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{ backgroundImage: `url(${bgimage})` }} className='mx-22 h-44 bg-bottom pt-12'>
                        <div className='mx-36'>
                            <img src={logo} alt="" />
                        </div>
                        <nav className='mx-36'>
                            <ul className='flex'>
                                {menuItems.map(menuItem => (
                                    <li key={menuItem.id} className='pe-6 pt-10'>
                                        <Link legacyBehavior href={menuItem.href}>
                                            <a>{menuItem.name}</a>
                                        </Link>
                                        {menuItem.children.length > 0 && (
                                            <ul className="submenu">
                                                {menuItem.children.map((childItem, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link legacyBehavior href={childItem.href}>
                                                                <a>{childItem.name}</a>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}


export default Navbar;
