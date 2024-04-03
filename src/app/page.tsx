'use client'
import Categories from '../components/Category';
import Products from '../components/Products';
import './navbar.css'
import React, { useEffect, useState } from "react";
export default function Home() {
    const [dashboard, setDashboard] = useState<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost/wordpress/wp-json/wp/v2/pages?slug=home');
                const data = await response.json();
                setDashboard(data[0]);
            } catch (error) {
                console.log(error, 'An unknown error occurred');
            }
        })();
    }, []);
    return (
            <main className='bg-slate-50'>
                {dashboard ? <h1 className='text-center mt-52'>{dashboard.title.rendered}</h1> : <div className='centered'>
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>}
                <div className='relative'>
                <Categories />
                <Products />
                </div>
            </main>
    );
}

// <div className="px-10 w-4/12">
//     <h6 className="text-justify font-bold mb-0">Search</h6>
//     <input type="text" className="ip" />
//     <button type="button" className="btn1 inline-flex w-full justify-center rounded-sm bg-lime-400 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 sm:ml-3 sm:w-auto">Add to cart</button>
//     <div className="mt-12">
//         <h2 className="text-justify font-extralight">Recent Post</h2>
//     </div>
//     <div className="mt-12 text-justify">
//         <h2 className="text-justify font-extralight">Recent Comments</h2>
//         <p className="text-sm">No comments to show.</p>
//     </div>
//     <div className="mt-12 text-justify">
//         <h2 className="text-justify font-extralight">Archives</h2>
//         <p className="text-sm">No archives to show.</p>
//     </div>
//     <div className="mt-12 text-justify">
//         <h2 className="text-justify font-extralight">Categories</h2>
//         <p className="text-sm">No categories</p>
//     </div>
// </div>