import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrap')}>
            <div className="container mx-auto">
                <h1>Footer</h1>
            </div>
        </div>
    );
}

export default Footer;
