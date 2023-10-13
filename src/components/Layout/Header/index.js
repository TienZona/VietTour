import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import Logo from '~/assets/background/logo.png';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const cx = classNames.bind(styles);

const items = [
    {
        key: '1',
        label: (
            <Link to="/login">
                <span>Đăng nhập</span>
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="/register">
                <span>Đăng ký</span>
            </Link>
        ),
    },
];

function Header() {
    const [cookies] = useCookies(['access_token', 'name']);

    const navigate = useNavigate();

    if (cookies.access_token) {
        items[1].label = <span onClick={() => logout()}>Đăng xuất</span>;
        items[1].danger = true;
        items[0].label = (
            <Link to="/profile">
                <span>Profile</span>
            </Link>
        );
    } else {
        items[0].label = (
            <Link to="/login">
                <span>Đăng nhập</span>
            </Link>
        );
        items[1].danger = false;
        items[1].label = (
            <Link to="/register">
                <span>Đăng ký</span>
            </Link>
        );
    }

    const logout = () => {
        // eslint-disable-next-line no-useless-concat
        document.cookie = 'access_token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // eslint-disable-next-line no-useless-concat
        document.cookie = 'username' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // eslint-disable-next-line no-useless-concat
        document.cookie = 'user_id' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // eslint-disable-next-line no-useless-concat
        document.cookie = 'name' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        navigate('/login');
    };

    return (
        <div className={cx('wrap')}>
            <div className="container mx-auto flex justify-between items-center" style={{ height: '100%' }}>
                <Link to="/">
                    <img className={cx('logo')} src={Logo} alt="" />
                </Link>
                <div className={cx('search')}>
                    <SearchOutlined className={cx('btn')} />
                    <input type="text" placeholder="Tìm kiếm tour..." />
                </div>
                <div className={cx('navbar')}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <div className={cx('item')}>
                            <span>{cookies.name !== 'undefined' ? cookies.name : 'User'}</span>
                            <UserOutlined className={cx('icon')} />
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Header;
