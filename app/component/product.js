import React from 'react'
import axios from 'axios'
import Image from 'next/image' 

/*====This fetch data here====*/
export async function getData() {
  try {
    const res = await axios.get('https://dummyjson.com/products')
    return res.data
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}
/*====This fetch data here====*/

const Product = async () => {
  
  const data = await getData();

  console.log(data)

  return (
    <div className=''>
      <h1 className='p-5 font-bold'>Product</h1>
      <ul className="flex flex-wrap gap-4">
        {data.products.map((product) => (
          <li
            key={product.id}
            className="w-full md:w-1/2 lg:w-1/4 p-4 border rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <Image 
              src={product.thumbnail} 
              width={200} 
              height={200} 
              alt={product.title} 
              className="object-cover rounded-md mb-2" the image
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-700">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
 
export default Product
 