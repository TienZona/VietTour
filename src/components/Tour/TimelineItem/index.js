import styles from './TimeLineItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TimeLineItem() {
    return (
        <div className={cx('wrap')}>
            <h1>Content</h1>
        </div>
    );
}

export default TimeLineItem;
