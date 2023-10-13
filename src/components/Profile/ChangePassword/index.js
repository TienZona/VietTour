import styles from './ChangePassword.module.scss';
import classNames from 'classnames/bind';
import { Button, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ChangePassword({ info, reset }) {
    const [isPWIconOld, setIsPWIconOld] = useState(false);
    const [isPWIconNew, setIsPWIconNew] = useState(false);
    const [isPWIconNewConfirm, setIsPWIconNewConfirm] = useState(false);

    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPassConf, setNewPassConf] = useState('');

    const [user, setUser] = useState({
        _id: '',
        name: '',
        email: '',
        gender: '',
        phone: '',
        address: '',
    });

    const updatePassword = () => {
        if (validator() && user._id) {
            axios
                .put(`http://localhost:3001/customers/${user._id}`, {
                    password: newPass,
                })
                .then((res) => {
                    if (res.status === 200) {
                        message.success('Cập nhật thành công!');
                        reset();
                        setPassword('');
                        setNewPass('');
                        setNewPassConf('');
                    }
                })
                .catch((err) => {
                    message.error('Cập nhật thất bại!');
                });
        }
    };

    const validator = () => {
        if (password !== user.password) {
            message.error('Sai mật khẩu!');
            return false;
        }

        if (newPass.length < 8) {
            message.error('Mật khẩu mới phải lớn hơn 8 ký tự!');
            return false;
        }

        if (newPass !== newPassConf) {
            message.error('Mật khẩu không khớp!');
            return false;
        }
        return true;
    };

    useEffect(() => {
        setUser(info);
    }, [info]);

    return (
        <div className={cx('wrap')}>
            <div className="flex flex-col items-center mt-10">
                <div className="flex justify-between items-center mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Mật khẩu cũ:</h3>
                    <Input
                        type={!isPWIconOld ? 'password' : 'text'}
                        placeholder="Nhập mật khẩu cũ"
                        style={{ width: 250 }}
                        size="large"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        suffix={
                            isPWIconOld ? (
                                <EyeOutlined onClick={() => setIsPWIconOld(!isPWIconOld)} />
                            ) : (
                                <EyeInvisibleOutlined onClick={() => setIsPWIconOld(!isPWIconOld)} />
                            )
                        }
                    />
                </div>
                <div className="flex justify-between items-center mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium"> Mật khẩu mới:</h3>
                    <Input
                        placeholder="Nhập mật khẩu cũ"
                        type={!isPWIconNew ? 'password' : 'text'}
                        size="large"
                        onChange={(e) => setNewPass(e.target.value)}
                        value={newPass}
                        style={{ width: 250 }}
                        suffix={
                            isPWIconNew ? (
                                <EyeOutlined onClick={() => setIsPWIconNew(!isPWIconNew)} />
                            ) : (
                                <EyeInvisibleOutlined onClick={() => setIsPWIconNew(!isPWIconNew)} />
                            )
                        }
                    />
                </div>
                <div className="flex justify-between items-center mt-8" style={{ width: 450 }}>
                    <h3 className="text-center font-mono text-3xl font-medium">Xác nhận mật khẩu:</h3>
                    <Input
                        type={!isPWIconNewConfirm ? 'password' : 'text'}
                        placeholder="Nhập mật khẩu cũ"
                        size="large"
                        onChange={(e) => setNewPassConf(e.target.value)}
                        value={newPassConf}
                        style={{ width: 250 }}
                        suffix={
                            isPWIconNewConfirm ? (
                                <EyeOutlined onClick={() => setIsPWIconNewConfirm(!isPWIconNewConfirm)} />
                            ) : (
                                <EyeInvisibleOutlined onClick={() => setIsPWIconNewConfirm(!isPWIconNewConfirm)} />
                            )
                        }
                    />
                </div>
                <div className="flex justify-center" style={{ width: 450 }}>
                    <button
                        onClick={() => updatePassword()}
                        className={cx('btn') + ' text-center font-mono text-3xl font-medium'}
                    >
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
