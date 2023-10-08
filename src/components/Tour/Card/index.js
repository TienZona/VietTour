import styles from './Card.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Card({ img }) {
    return (
        <div className={cx('wrap')}>
            <img src={img} alt="" />
            <div className={cx('content')}>
                <span>300 lượt khách</span>
                <div className={cx('text')}>
                    <h2 className="text-3xl">Tên địa điểm</h2>
                    <p>Mô tả địa điểm</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
