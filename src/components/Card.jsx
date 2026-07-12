import React from 'react'
import ResponsiveImage from './ResponsiveImage'
import './Card.css'

const Card = ({product,index}) => {
  return (
      <div>
          <div className="left-card">
              <div className="card-name">
                  <span>{product.name}</span>
                  <span>{product.detail}</span>
              </div>
              <span>₹{product.price}</span>
              <div>Shop Now</div>
          </div>
          <ResponsiveImage src={product.img} alt={product.name} className='product-img' width={150} height={150} />
    </div>
  )
}

export default Card

