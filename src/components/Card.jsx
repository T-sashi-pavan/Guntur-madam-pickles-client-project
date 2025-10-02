import React from 'react'
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
          <img src={product.img} alt="" className='product-img' />
    </div>
  )
}

export default Card
