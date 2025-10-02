import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import Card from './Card'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Slider.css'

import { SliderProducts } from '../data/products'
const Slider = () => {
    return (
        <div className='swiper-container'>
            <Swiper
                modules={[Pagination, Navigation]}
                className='mySwiper'
                navigation={true}
                loopFillGroupWithBlank={true}
                slidesPerGroup={1}
                slidesPerView={3}
                spaceBetween={40}
                loop={true}
            >
                {SliderProducts.map((slide, i) => (
                    <SwiperSlide>
                        <Card product={slide}/>
                        {/* <div className="left-slide">
                            <div className="name">
                                <span>{slide.name}</span>
                                <span>{slide.detail }</span>
                            </div>
                            <span>₹{slide.price}</span>
                            <div>Shop Now</div>
                        </div>
                        <img src={slide.img} alt="" className='p-img' /> */}
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default Slider
