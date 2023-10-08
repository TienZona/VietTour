import styles from './SliderItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SliderItem({ img }) {
    return (
        <div className={cx('wrap')}>
            <img className={cx('img')} src={` ${img}`} alt="" />
        </div>
    );
}

export default SliderItem;
