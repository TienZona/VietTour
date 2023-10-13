import styles from './ChangeInfo.module.scss';
import classNames from 'classnames/bind';
import { Button, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ChangeInfo({ info, reset }) {
    const [user, setUser] = useState({
        _id: '',
        name: '',
        email: '',
        gender: '',
        phone: '',
        address: '',
    });

    const updateInfo = () => {
        if (validator() && user._id) {
            axios
                .put(`http://localhost:3001/customers/${user._id}`, user)
                .then((res) => {
                    if (res.status === 200) {
                        message.success('Cập nhật thành công!');
                        reset();
                    }
                })
                .catch((err) => {
                    message.error('Cập nhật thất bại!');
                });
        }
    };

    const validator = () => {
        if (!user.name) {
            message.error('Vui lòng nhập tên người dùng!');
            return false;
        }

        if (!user.phone) {
            message.error('Vui lòng nhập số điện thoại!');
            return false;
        }
        if (!user.email) {
            message.error('Vui lòng nhập email!');
            return false;
        }

        if (!user.address) {
            message.error('Vui lòng nhập địa chỉ!');
            return false;
        }

        if (!validateEmail(user.email)) {
            message.error('Email không hợp lệ!');
            return false;
        }

        if (user.phone.length < 10) {
            message.error('Số điên thoại không hợp lệ!');
            return false;
        }

        return true;
    };

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    useEffect(() => {
        setUser(info);
    }, [info]);

    return (
        <div className={cx('wrap')}>
            <div className="flex flex-col items-center mt-10">
                <div className="flex justify-between mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Họ và tên:</h3>
                    <Input
                        onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                name: e.target.value,
                            }));
                        }}
                        value={user?.name}
                        showCount
                        style={{ width: 300 }}
                        maxLength={50}
                    />
                </div>
                <div className="flex justify-between mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Giới tính:</h3>
                    <Select
                        defaultValue="Nam"
                        onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                gender: e,
                            }));
                        }}
                        value={user?.gender}
                        style={{
                            width: 300,
                        }}
                        options={[
                            {
                                value: 'Nam',
                                label: 'Nam',
                            },
                            {
                                value: 'Nữ',
                                label: 'Nữ',
                            },
                            {
                                value: 'Khac',
                                label: 'Khác',
                            },
                        ]}
                    />
                </div>
                <div className="flex justify-between mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Số điện thoại:</h3>
                    <Input
                        onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                phone: e.target.value,
                            }));
                        }}
                        value={user?.phone}
                        type="number"
                        minLength={10}
                        style={{ width: 300 }}
                    />
                </div>
                <div className="flex justify-between mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Email:</h3>
                    <Input
                        onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                email: e.target.value,
                            }));
                        }}
                        value={user?.email}
                        type="email"
                        style={{ width: 300 }}
                    />
                </div>
                <div className="flex justify-between mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Địa chỉ:</h3>
                    <TextArea
                        onChange={(e) => {
                            setUser((user) => ({
                                ...user,
                                address: e.target.value,
                            }));
                        }}
                        value={user?.address}
                        rows={1}
                        style={{ width: 300 }}
                    />
                </div>
                <div className="flex justify-end" style={{ width: 450 }}>
                    <button
                        onClick={() => updateInfo()}
                        className={cx('btn') + ' text-center font-mono text-3xl font-medium'}
                    >
                        Cập nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangeInfo;
