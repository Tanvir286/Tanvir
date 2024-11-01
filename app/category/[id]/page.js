"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image'; // Importing Image component from Next.js
import { getData } from '@/app/component/product';

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const productId = Number(id);
  const router = useRouter(); // Initialize useRouter

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(product);

  /*===Fetch data when the component mounts=====*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(); // Assuming this fetches an array of products
        const filteredProduct = data.products.find(prod => prod.id === productId); // Filter by ID
        setProduct(filteredProduct); // Set the filtered product
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]); // Include productId as a dependency
  /*===Fetch data when the component mounts ===*/

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!product) {
    return <div>No product found.</div>; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="w-[400px] mt-5 p-4 border border-gray-300 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Product Details for ID {productId}</h1>
        
        {/* Render product details here */}
        <Image
          src={product.thumbnail} // Assuming thumbnail is the URL for the product image
          width={400}
          height={300}
          alt={product.title}
          className="object-cover rounded-t-lg mb-4 transition-transform duration-300 hover:scale-105"
        />
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">${product.price}</p>
        {/* Add more product details as necessary */}

        {/* Back Button */}
        <button 
          onClick={() => router.back()} // Use router to navigate back
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
