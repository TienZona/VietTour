import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import Slider from '~/components/Global/Slider';
import SliderSlick from 'react-slick';
import SliderItem from '~/components/Global/SliderItem';
import { message } from 'antd';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '~/components/Tour/Card';
import CardSuggest from '~/components/Tour/CardSuggest';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 5,
    speed: 500,
};

function Home() {
    const [tours, setTour] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/tours`, {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setTour(res.data.data);
                }
            })
            .catch((err) => {
                message.error(err.response.data.message);
            });
    }, []);
    return (
        <div className={(cx('wrap'), ' container mx-auto')} style={{ paddingTop: '80px' }}>
            <div className={cx('content') + ' flex justify-center'}>
                <div style={{ width: '1000px', marginTop: '20px' }}>
                    <div className={cx('box')}>
                        <Slider />
                    </div>
                </div>
            </div>
            <div className="my-12">
                <div>
                    <h3 className="text-4xl py-6 font-semibold  tracking-tight text-red-950">Địa điểm nổi bật</h3>
                </div>
                <div>
                    <SliderSlick {...settings}>
                        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlaZGjKB4DftQKx4oAhxNkz9eUJe1rx7T0w&usqp=CAU" />
                        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlaZGjKB4DftQKx4oAhxNkz9eUJe1rx7T0w&usqp=CAU" />
                        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlaZGjKB4DftQKx4oAhxNkz9eUJe1rx7T0w&usqp=CAU" />
                        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlaZGjKB4DftQKx4oAhxNkz9eUJe1rx7T0w&usqp=CAU" />
                        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlaZGjKB4DftQKx4oAhxNkz9eUJe1rx7T0w&usqp=CAU" />
                        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlaZGjKB4DftQKx4oAhxNkz9eUJe1rx7T0w&usqp=CAU" />
                    </SliderSlick>
                </div>
            </div>
            <div className="my-12">
                <div>
                    <h3 className="text-4xl py-6 font-semibold  tracking-tight text-red-950">Gợi ý cho bạn</h3>
                </div>
                <div>
                    <SliderSlick {...settings} slidesToShow={3}>
                        {tours.map((tour, index) => (
                            <CardSuggest key={index} tour={tour} />
                        ))}
                    </SliderSlick>
                </div>
            </div>
        </div>
    );
}

export default Home;
