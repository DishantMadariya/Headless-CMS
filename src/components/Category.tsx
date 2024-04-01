import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/app/navbar.css';
interface Category {
    id: number;
    name: string;
    slug: string;
    image: {
        src: string;
        alt: string;
    };
    _links: {
        collection: [{ href: string }];
    };
    count: number;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost/wordpress/wp-json/wc/v3/products/categories?parent=0', {
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

    const replaceApiBaseUrl = (url: string, slug: string) => {
        return url.replace(
            'https://localhost/wordpress/wp-json/wc/v3/products/categories',
            `http://localhost:3000/product-category/${slug}`
        );
    };

    return (
        <div>
            <h2 className='text-center my-20'>Shop by Category</h2>
            <ul className='flex justify-center'>
                {categories.map((category) => (
                    <li key={category.id} className='mx-5 list-none'>
                        <a className='text-center no-underline' href={replaceApiBaseUrl(category._links.collection[0].href, category.slug)}>
                            <img src={category.image.src} className='w-80 h-52 object-cover object-center' alt={category.image.alt} />
                            {category.name} <strong>({category.count})</strong>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
