'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
interface RouteParams {
    subcategory: string;
}
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
interface Product {
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
export default function SubCate({ params }: { params: RouteParams }) {
    const [subCate, setSubCate] = useState<Category[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const subResponse = await axios.get<Category[]>(`https://localhost/wordpress/wp-json/wc/v3/products/categories?slug=${params.subcategory}`, {
                    headers: {
                        'Authorization': 'Basic Y2tfZDZjODcyODlhYWQzZTczMzFkOWVhMmE1NGYwZDA5ZGQ2YTc0ZjdiMDpjc18zZGJhMGNmY2RhZjhiMjE1ODg3YTZhNDdlNWJjM2I1OGFjMzNiOTBk'
                    }
                });
                setSubCate(subResponse.data);

                if (subResponse.data.length > 0) {
                    const categoryIds = subResponse.data.map(category => category.id);
                    const productResponse = await axios.get(`https://localhost/wordpress/wp-json/wc/v3/products`, {
                        headers: {
                            'Authorization': 'Basic Y2tfZDZjODcyODlhYWQzZTczMzFkOWVhMmE1NGYwZDA5ZGQ2YTc0ZjdiMDpjc18zZGJhMGNmY2RhZjhiMjE1ODg3YTZhNDdlNWJjM2I1OGFjMzNiOTBk'
                        }
                    });
                    //set loop 
                    // Filter products based on category IDs
                    const filteredProducts = productResponse.data.filter((product: { categories: any[]; }) =>
                        product.categories.some(category => categoryIds.includes(category.id))
                    );

                    setFilteredProducts(filteredProducts);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [params.subcategory]);

    const replaceApiBaseUrl = (url: string, id: number) => {
        return url.replace(
            `https://localhost/wordpress/wp-json/wc/v3/products/${id}`,
            `http://localhost:3000/products/${id}`
        );
    };
    return (
        <div>
            {filteredProducts.length === 0 ? (
                <div className='centered'>
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className='text-center my-10'>Products</h2>
                    <ul className='flex justify-center'>
                        {filteredProducts.map((Product) => (
                            <li key={Product.id} className='mx-5 list-none text-center'>
                                <Link className='text-center no-underline' href={replaceApiBaseUrl(Product._links.self[0].href, Product.id)}>
                                    <img src={Product.images[0].src} className='w-80 h-52 object-cover object-center' />
                                    <strong className='text-center flex justify-center'>
                                        {Product.name}
                                    </strong>
                                    <span className='flex justify-center items-center'>
                                        <p className='mx-2'><s>₹{Product.regular_price}</s></p>
                                        <p>₹{Product.sale_price}</p>
                                    </span>
                                </Link>
                                <button type="button" className="inline-flex w-full justify-center rounded-sm bg-lime-400 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 sm:ml-3 sm:w-auto">Add to cart</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
};
