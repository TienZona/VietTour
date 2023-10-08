import styles from './Default.module.scss';
import classNames from 'classnames/bind';

import Header from '../Header';
import Footer from '../Footer';
import Home from '~/pages/Home';

const cx = classNames.bind(styles);

function Default({ Children }) {
    return (
        <div className={cx('wrap')}>
            <Header />
            <Home />
            <Footer />
        </div>
    );
}

export default Default;
