import styles from './TimeLineIcon.module.scss';
import classNames from 'classnames/bind';

import icon from '~/assets/icon/car.png';

const cx = classNames.bind(styles);

function TimeLineIcon() {
    return (
        <div className={cx('wrap')}>
            <img src={icon} alt="" />
        </div>
    );
}

export default TimeLineIcon;
