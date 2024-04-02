'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import '@/app/navbar.css'
import Sidebar from "@/components/Sidebar";
interface RouteParams {
    slug: number;
}

interface Product {
    short_description: string | TrustedHTML;
    id: number;
    name: string;
    slug: string;
    images: {
        src: string;
    }[];
    _links: {
        self: {
            href: string;
        }[];
    };
    regular_price: number;
    sale_price: number;
}

export default function ProductsShow({ params }: { params: RouteParams }) {
    const [productShow, setProductShow] = useState<Product[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost/wordpress/wp-json/wc/v3/products/${params.slug}`, {
                    headers: {
                        'Authorization': 'Basic Y2tfZDZjODcyODlhYWQzZTczMzFkOWVhMmE1NGYwZDA5ZGQ2YTc0ZjdiMDpjc18zZGJhMGNmY2RhZjhiMjE1ODg3YTZhNDdlNWJjM2I1OGFjMzNiOTBk'
                    }
                });
                setProductShow([response.data]);
                setSelectedImage(response.data.images[0].src); // Set default selected image
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [params.slug]);

    const handleImageClick = (src: string) => {
        setSelectedImage(src);
    };

    return (
        <div className="px-16">
            {productShow.length === 0 ? (
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
                    <div className='flex justify-center container items-center'>
                        {productShow.map((product) => (
                            <div key={product.id}>
                                <section key={product.id} className='mx-5 list-none text-center w-full flex'>
                                    <div className="w-4/12 px-10">
                                        <img src={selectedImage} className='w-full h-auto image object-cover object-top mb-3' />
                                        <div className="flex justify-center w-full px-10 mb-5">
                                            {product.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.src}
                                                    alt={`Image ${index}`}
                                                    className='w-1/6 h-auto object-cover mx-1 object-center cursor-pointer'
                                                    onClick={() => handleImageClick(image.src)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-4/12 px-10">
                                        <h2 className="text-justify">
                                            {product.name}
                                        </h2>
                                        <p className="my-auto sizieng text-justify" dangerouslySetInnerHTML={{ __html: product.short_description }}></p>
                                        <div className="flex items-center mb-10">
                                            <input type="number" min={1} max={6} name="quantity" defaultValue={1} />
                                            <button type="button" className="btn inline-flex w-full justify-center rounded-sm bg-black px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 sm:ml-3 sm:w-auto">Add to cart</button>
                                        </div>
                                    </div>
                                    <div className="px-10 w-4/12">
                                        <Sidebar />
                                    </div>
                                </section>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
