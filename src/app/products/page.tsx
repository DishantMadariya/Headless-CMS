'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/app/navbar.css';
import Link from 'next/link';
interface Category {
    id: number;
    name: string;
    slug: string;
    images: [
        {
            src: string,
        }
    ]
    _links: {
        self: [{ href: string }];
    };
    regular_price: number;
    sale_price: number;
}

const Products = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost/wordpress/wp-json/wc/v3/products', {
                    headers: {
                        'Authorization': 'Basic Y2tfZDZjODcyODlhYWQzZTczMzFkOWVhMmE1NGYwZDA5ZGQ2YTc0ZjdiMDpjc18zZGJhMGNmY2RhZjhiMjE1ODg3YTZhNDdlNWJjM2I1OGFjMzNiOTBk'
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const replaceApiBaseUrl = (url: string, id: number) => {
        return url.replace(
            `https://localhost/wordpress/wp-json/wc/v3/products/${id}`,
            `http://localhost:3000/products/${id}`
        );
    };

    return (
        <div>
            <h2 className='text-center my-10'>Products</h2>
            <ul className='flex justify-center'>
                {categories.map((category) => (
                    <li key={category.id} className='mx-5 list-none text-center'>
                        <Link className='text-center no-underline' href={replaceApiBaseUrl(category._links.self[0].href, category.id)}>
                            <img src={category.images[0].src} className='w-80 h-52 object-cover object-center' />
                            <strong className='text-center flex justify-center'>
                            {category.name}
                            </strong>
                            <span className='flex justify-center items-center'>
                                <p className='mx-2'><s>₹{category.regular_price}</s></p>
                                <p>₹{category.sale_price}</p>
                            </span>
                        </Link>
                        <button type="button" className="inline-flex w-full justify-center rounded-sm bg-lime-400 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 sm:ml-3 sm:w-auto">Add to cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
