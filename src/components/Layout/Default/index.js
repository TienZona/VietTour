import styles from './Default.module.scss';
import classNames from 'classnames/bind';

import Header from '../Header';
import Footer from '../Footer';

const cx = classNames.bind(styles);

function Default({ children }) {
    return (
        <div className={cx('wrap')}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Default;
