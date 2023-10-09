import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import SliderSlick from 'react-slick';
import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Select } from 'antd';
import { useParams } from 'react-router-dom';
import iconCoin from '~/assets/icon/coins.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faCar, faQuestionCircle, faShieldHeart, faStore, faTicket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function Detail() {
    const [tour, setTour] = useState('');
    const [calender, setCalender] = useState([]);
    const [indexDate, setIndexDate] = useState(0);
    let { id } = useParams();

    useEffect(() => {
        axios(`http://localhost:3001/tours/${id}`)
            .then((res) => {
                setTour(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setTour();
    }, []);

    useEffect(() => {
        if (tour) {
            axios(`http://localhost:3001/calendartour/byTour/${tour._id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setCalender(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [tour]);

    return (
        <div className={cx('wrap') + ' container mx-auto'} style={{ paddingTop: '80px' }}>
            {tour && (
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className={cx('box')}>
                            <div className={cx('slide')}>
                                <SliderSlick {...settings}>
                                    {tour.image.map((img, index) => (
                                        <img
                                            key={index}
                                            className={cx('img')}
                                            src={`http://localhost:3001/files/${img}`}
                                            alt=""
                                        />
                                    ))}
                                </SliderSlick>

                                <div className={cx('heading')}>
                                    <h1 className="font-mono text-4xl font-semibold text-lime-900 my-2">{tour.name}</h1>
                                    <h2 className="font-mono text-3xl font-semibold text-yellow-600 text-end my-2 px-6">
                                        {tour.type_tour_id.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className={cx('box')}>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <p className=" font-mono text-3xl text-sky-700">Loại hình tour</p>
                                </div>
                                <div className="col-span-1">
                                    <p className=" font-mono text-3xl text-indigo-300 font-medium">
                                        {tour.type_tour_id.name}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <p className=" font-mono text-3xl text-sky-700">Số ngày</p>
                                </div>
                                <div className="col-span-1">
                                    <p className=" font-mono text-3xl text-indigo-300 font-medium">
                                        {tour.time} ngày - {tour.time - 1} đêm
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <p className=" font-mono text-3xl text-sky-700">Ngày khởi hành</p>
                                </div>
                                <div className="col-span-1">
                                    {calender.length !== 0 && (
                                        <Select
                                            showSearch
                                            style={{
                                                width: 200,
                                            }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '')
                                                    .toLowerCase()
                                                    .localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            defaultValue={0}
                                            options={calender.map((item, index) => {
                                                const date = new Date(item.start_date);
                                                return {
                                                    value: index,
                                                    label: date.toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                    }),
                                                };
                                            })}
                                            onChange={(value) => setIndexDate(value)}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <p className=" font-mono text-3xl text-sky-700">Ngày kết thúc</p>
                                </div>
                                <div className="col-span-1">
                                    {calender.length !== 0 && (
                                        <p className=" font-mono text-3xl text-indigo-300 font-medium">
                                            {new Date(calender[indexDate].end_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <img src={iconCoin} alt="" width={'28px'} />
                                </div>
                                <div className="col-start-2 col-span-1">
                                    <p className=" font-mono text-4xl text-orange-600">
                                        {tour.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <p className={cx('line')}></p>
                            </div>
                            <div className="flex justify-center">
                                <h3 className="text-sky-400 font-semibold my-3">DỊCH VỤ TOUR</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faTicket} />
                                    <span className="mx-3">Vé tham quan</span>
                                </div>
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faBurger} />
                                    <span className="mx-3">Dịch vụ ăn uống</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faStore} />
                                    <span className="mx-3">Dịch vụ lưu trú</span>
                                </div>
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faCar} />
                                    <span className="mx-3">Phương tiện</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                    <span className="mx-3">Hổ trợ đặt vé</span>
                                </div>
                                <div className="col-span-1">
                                    <FontAwesomeIcon icon={faShieldHeart} />
                                    <span className="mx-3">Bảo hiểm</span>
                                </div>
                            </div>
                            <div className="flex justify-center mt-5">
                                <button className={cx('btn')}>Đặt vé ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
