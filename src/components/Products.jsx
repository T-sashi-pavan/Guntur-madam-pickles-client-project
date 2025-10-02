import React from 'react'
import './Products.css'
import {ProductsData} from '../data/products.js'
import { useState } from 'react'
import Card from './Card'

const Products = () => {
    const [menuProducts, setMenuProducts] = useState(ProductsData)

    const filter = (type) => {
        setMenuProducts(ProductsData.filter((product)=>product.type === type))
    }
  return (
    <div className='p-container'>
          <h1>Choose from a Variety of Products</h1>
          <div className="products">
              <ul className="menu">
                  <li onClick={()=>setMenuProducts(ProductsData)}>All</li>
                  <li onClick={()=>filter("spicy")}>Spicy</li>
                  <li onClick={() => filter("sweet")}>Sweet</li>
              </ul>
              <div className="list">
                  {
                      menuProducts.map((product, i) => (
                          <div className="product">
                              <Card product={product} index={i} />
                          </div>
                      ))
                  }
              </div>
          </div>
    </div>
  )
}

export default Products
