import styles from './CardSuggest.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CardSuggest({ img }) {
    return (
        <div className={cx('wrap')}>
            <img src={img} alt="" />
            <div className={cx('content')}>
                <span className={cx('line')}></span>
                <h2 className="text-lime-700 text-3xl font-semibold my-2">Du lịch Đà Lạt 2 ngày 1 đêm</h2>

                <span>12/12/2023 - Khởi hành</span>

                <span className={cx('line')}></span>

                <div className={cx('desc')}>
                    <p>Nơi khởi hành: Bến xe Cần Thơ</p>
                    <span>Còn 12 chỗ ngồi</span>
                </div>

                <div className={cx('price')}>
                    <h3 className="text-orange-400 text-xl font-semibold my-2 ">
                        Giá cũ <span className="line-through text ">3.000.000</span>đ
                    </h3>
                    <h3 className="text-orange-600 text-2xl font-semibold my-2">Mới 3.000.000đ</h3>
                </div>
                <div className={cx('vehicle')}>
                    <p>Phương tiện - Xe BUS</p>
                </div>

                <button className={cx('btn')}>
                    <h2 className="text-2xl font-semibold">Đặt vé ngay</h2>
                </button>
            </div>
        </div>
    );
}

export default CardSuggest;
