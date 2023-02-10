import { useEffect, useState } from "react";
import Product from "../components/Product";
import {initMongoose} from "../lib/mongoose";
import {findAllProducts} from "./api/products";
import Layout from "@/components/Layout";


export default function Home({products}) {
  const [phrase, setPhrase] = useState('');

  const categoriesNames = [...new Set(products.map(p => p.category))];

  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <div className="flex justify-center">
      <input 
        value ={phrase} 
        onChange={e => setPhrase(e.target.value)} 
        type="text" 
        placeholder="Search for Products" 
        className="bg-gray-100 w-6/12 py-2 px-4 rounded-xl"
      />
      </div>
      <div className="mt-4">
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            <h2 className="text-2xl capitalize text-center mb-4 mt-4 text-emerald-700 font-bold">{categoryName}</h2>
            {products.find(p => p.category === categoryName) && (
              <div  className="flex justify-center">
                
                <div className="flex -mx-5 overflow-x-scroll snap-start scrollbar-hide">
                  {products.filter(p => p.category === categoryName).map(productInfo => (
                    <div key={productInfo._id} className="px-5">
                      <Product {...productInfo} />
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>
          ))}
      </div>

    </Layout>
    
  )
}


export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}