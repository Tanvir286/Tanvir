"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '../component/product';
import { IoMdArrowDropdown } from "react-icons/io";
import Image from 'next/image';

const CategoryPage = () => {


  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter(); // Initialize useRouter for navigation

  /*===Fetch data when the component mounts=====*/
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setAllProducts(data.products); 
    };
    fetchData();
  }, []);
  /*===Fetch data when the component mounts ===*/

  /*====Extract unique categories*/
  const allProductCategories = [...new Set(allProducts.map(product => product.category))];

  /*==== Function to filter products based on selected category===*/
  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  return (
    <div className=''>
        <div className="py-5">
              <div className="flex justify-between">
                {/* Left part start */}
                <div className=" md:w-[25%] bg-white  px-5 mb-4 md:mb-0 ">        
                  <div className="shadow-xl px-5 mb-4 pb-5 border pt-4 rounded-md">
                  <h1 className="text-xl font-bold text-center mb-4">All Product Categories:</h1>
                      <ul className="mt-4 space-y-2 shadow-lg rounded-lg">
                        <li 
                          className="text-lg flex items-center justify-between text-gray-700 hover:text-blue-500 cursor-pointer transition-colors border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 p-2"
                          onClick={() => setSelectedCategory('All')}
                        >
                          All  <IoMdArrowDropdown />
                        </li>
                        {allProductCategories.map((category, index) => (
                            <div
                            key={index} 
                            className={`text-lg text-gray-700 hover:text-blue-500 cursor-pointer transition-colors border border-gray-300 rounded-lg flex shadow-md hover:shadow-lg bg-white hover:bg-blue-100 p-2 items-center justify-between ${
                              selectedCategory === category ? 'bg-blue-200 text-blue-600' : ''
                            }`}
                            onClick={() => setSelectedCategory(category)} // Set selected category on click
                          >
                            {category} <IoMdArrowDropdown />
                          </div>
                        ))}
                      </ul>
                  </div>
                 
                </div>
                {/* Left part end */}

                {/* Right part start */}
                <div className="w-full md:w-[75%]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
                      >
                        <Image
                          src={product.thumbnail}
                          width={400}
                          height={300}
                          alt={product.title}
                          className="object-cover rounded-t-lg mb-4 transition-transform duration-300 hover:scale-105"
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="text-lg font-bold text-blue-600">${product.price}</p>
                        <button className="mt-2 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition-colors">
                          Add to Cart
                        </button>
                        <button className="mt-2 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500 transition-colors"
                        onClick={() => router.push(`/category/${product.id}`)}>
                        View Details
                      </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right part end */}
              </div>
         </div>
    </div>
   
  );
};

export default CategoryPage;
