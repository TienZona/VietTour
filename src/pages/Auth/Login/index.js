import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useEffect, useRef, useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link, json } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '~/redux/actions/auth';
import Loading from '~/components/Global/Loading';
import Logo from '~/assets/background/logo.png';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['access_token']);
    const [isLoader, setIsLoader] = useState(false);
    const [isPassword, setIsPw] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const logUsernameReg = useRef(null);
    const logPassowrdReg = useRef(null);

    const validator = () => {
        if (!username) {
            usernameRef.current.focus();
            logUsernameReg.current.style.display = 'inline';
            return false;
        } else {
            logUsernameReg.current.style.display = 'none';
        }

        if (password === '') {
            passwordRef.current.focus();
            logPassowrdReg.current.style.display = 'inline';
            passwordRef.current.innerHTML = 'Please enter a password';
            return false;
        } else {
            logPassowrdReg.current.style.display = 'none';
        }

        if (password.length < 6) {
            passwordRef.current.focus();
            logPassowrdReg.current.style.display = 'inline';
            logPassowrdReg.current.innerHTML = 'Password is shorter than 6 characters';
            return false;
        } else {
            logPassowrdReg.current.style.display = 'none';
        }

        return true;
    };

    const submitLogin = () => {
        if (validator()) {
            setUsername('');
            setPassword('');
            login();
        }
    };

    const login = () => {
        const formData = {
            username: username,
            password: password,
        };
        setIsLoader(true);
        axios
            .post(`https://localhost:44352/api/Auth/login`, JSON.stringify(formData), {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    message.success('Successful Login');
                    let expires = new Date();
                    expires.setTime(expires.getTime() + res.data.expireDate * 1000);
                    setCookie('access_token', res.data.token, { path: '/', expires });
                    getProfile(res.data.token);
                    setIsLoader(false);
                }
            })
            .catch((err) => {
                setIsLoader(false);
                message.error(err.response.data.message);
            });
    };

    const getProfile = (token) => {
        axios
            .get(`https://localhost:44352/api/User/getMyProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            })
            .then((res) => {
                let expires = new Date();
                expires.setTime(expires.getTime() + res.data.expireDate * 1000);
                const user = {
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                    avatarUrl: res.data.avatarUrl,
                };
                const data = JSON.stringify(user);
                setCookie('user', data, { path: '/', expires });
                navigate('/home');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('wrap') + ' container mx-auto'}>
            <Link to="/">
                <div className={cx('logo')}>
                    <img src={Logo} alt="" />
                </div>
            </Link>
            <div className={cx('box')}>
                <div className={cx('header')}>
                    <h1 className="text-center text-4xl">Đăng nhập</h1>
                </div>
                <div className={cx('group')}>
                    <div className={cx('item')}>
                        <input
                            ref={usernameRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Tên đăng nhập"
                            onKeyDown={(e) => e.key === 'Enter'}
                        />
                        <span ref={logUsernameReg} className={cx('item-log')} style={{ display: 'none' }}>
                            Vui lòng nhập tên đăng nhập !
                        </span>
                    </div>
                    <div className={cx('item', 'password')}>
                        <input
                            ref={passwordRef}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={isPassword ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            onKeyDown={(e) => e.key === 'Enter'}
                        />
                        <div className={cx('icon')}>
                            {isPassword ? (
                                <EyeOutlined onClick={() => setIsPw(false)} />
                            ) : (
                                <EyeInvisibleOutlined onClick={() => setIsPw(true)} />
                            )}
                        </div>
                        <span ref={logPassowrdReg} className={cx('item-log')} style={{ display: 'none' }}>
                            Vui lòng nhập mật khẩu
                        </span>
                    </div>
                    <div className={cx('item')}>
                        <Link to={'/forgot'}>
                            <span className={cx('recovery')}>Quên mật khẩu</span>
                        </Link>
                    </div>
                    <div className={cx('item')}>
                        <button className={cx('btn')} onClick={() => submitLogin()}>
                            <h3>Đăng nhập</h3>
                        </button>
                    </div>
                    <div className={cx('ruler-bar')}>
                        <div className={cx('ruler', 'left')}></div>
                        <span>Hoặc</span>
                        <div className={cx('ruler', 'right')}></div>
                    </div>
                    <div className={cx('register')}>
                        <h4>
                            Bạn chưa có tài khoảng?
                            <Link to="/register">
                                <span className="ml-3"> Đăng ký</span>
                            </Link>
                        </h4>
                    </div>
                </div>
            </div>
            {isLoader && <Loading />}
        </div>
    );
}

export default Login;
