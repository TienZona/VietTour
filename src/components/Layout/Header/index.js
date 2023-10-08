import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import Logo from '~/assets/background/logo.png';
import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';

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
        danger: true,
        label: (
            <Link to="/logout">
                <span>Đăng xuất</span>
            </Link>
        ),
    },
];

function Header() {
    return (
        <div className={cx('wrap')}>
            <div className="container mx-auto flex justify-between items-center" style={{ height: '100%' }}>
                <img className={cx('logo')} src={Logo} alt="" />
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
                            <span>Notify</span>
                            <BellOutlined className={cx('icon')} />
                        </div>
                    </Dropdown>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <div className={cx('item')}>
                            <span>User</span>
                            <UserOutlined className={cx('icon')} />
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Header;
