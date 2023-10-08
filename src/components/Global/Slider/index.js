import React, { Component } from 'react';
import SliderSlick from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SliderItem from '../SliderItem';

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            centerPadding: '100px',
        };

        return (
            <div>
                <SliderSlick {...settings}>
                    <SliderItem img="https://nguoilambao.vn/images/news/2022/03/22/original/thu-tuong-nguyen-xuan-phuc-kiem-tra-cong-tac-khac-phuc-hau-qua-bao-so-1-tai-nam-dinh-1647920111.jpg" />
                    <SliderItem img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwEzioi6XqjRbks2sBJGNyaU8qCEijvdI65tvR80APAbffUquYU8q2Ms3jy8eFG7TxR8&usqp=CAU" />
                    <SliderItem img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hV0VswLWtL90e97bEYopXrsGjR_eN-lm_FmcGVCnGw-yU5lBjGFl4BVoWA700kD48AU&usqp=CAU" />
                </SliderSlick>
            </div>
        );
    }
}
