import { Image, Select } from 'antd';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { CameraOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Tooltip, Modal, Upload, message, Input } from 'antd';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import ChangeInfo from '~/components/Profile/ChangeInfo';
import ChangePassword from '~/components/Profile/ChangePassword';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const cx = classNames.bind(styles);
const props = {
    name: 'file',
    action: 'http://localhost:3001/upload',
    headers: {
        authorization: 'authorization-text',
    },
};
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function Profile() {
    const [isReset, setIsReset] = useState(false);
    const [cookies] = useCookies(['user_id']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [info, setInfo] = useState(null);
    const [uploadFile, setUploadFile] = useState([]);

    useEffect(() => {
        axios(`http://localhost:3001/customers/${cookies.user_id}`)
            .then((res) => {
                if (res.status === 200) {
                    setInfo(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [cookies, isReset]);

    const handleChange = (infoImg) => {
        if (infoImg.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (infoImg.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(infoImg.file.originFileObj, (url) => {
                setLoading(false);
                axios
                    .put(`http://localhost:3001/customers/${info._id}`, {
                        avatar: infoImg.file.originFileObj.name,
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            setIsModalOpen(false);
                            setIsReset(!isReset);
                            message.success('Cập nhật thành công!');
                        }
                    })
                    .catch((err) => {
                        message.error('Cập nhật thất bại!');
                    });
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const reset = () => {
        setIsReset(!isReset);
    };

    return (
        <div className={cx('wrap')}>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1">
                    <div className={cx('box')}>
                        <div className="flex justify-center">
                            <div className={cx('avatar-box')}>
                                <div className={cx('img')}>
                                    <Image
                                        width={200}
                                        height={200}
                                        style={{ marginLeft: '-6px' }}
                                        src={`http://localhost:3001/avatar/${info?.avatar}`}
                                    />
                                </div>
                                <Tooltip title="Cập nhật ảnh đại diện">
                                    <button className={cx('btn-change')} onClick={() => setIsModalOpen(true)}>
                                        <CameraOutlined />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                        {info && (
                            <div className="p-5">
                                <h2 className="text-center font-mono text-4xl font-medium ">{info?.name}</h2>
                                <div className="mx-10 my-5 font-mono text-3xl font-medium">
                                    <p className="p-2 text-black">
                                        Giới tính: <span className="ml-6 text-cyan-500">{info?.gender}</span>
                                    </p>
                                    <p className="p-2 text-black">
                                        SĐT: <span className="ml-6 text-cyan-500">{info?.phone}</span>
                                    </p>
                                    <p className="p-2 text-black">
                                        Email: <span className="ml-6 text-cyan-500">{info?.email}</span>
                                    </p>
                                    <p className="p-2 text-black">
                                        Địa chỉ: <span className="ml-6 text-cyan-500">{info?.address}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-2">
                    <div className={cx('box')}>
                        <div className="flex justify-center">
                            <div className={cx('head')}>
                                <h3
                                    className={cx(isActive && 'active') + ' text-center font-mono text-3xl font-medium'}
                                    onClick={() => setIsActive(!isActive)}
                                >
                                    Hồ sơ cá nhân
                                </h3>
                                <h3
                                    className={
                                        cx(!isActive && 'active') + ' text-center font-mono text-3xl font-medium'
                                    }
                                    onClick={() => setIsActive(!isActive)}
                                >
                                    Thay đổi mật khẩu
                                </h3>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            {isActive ? (
                                <ChangeInfo info={info} reset={reset} />
                            ) : (
                                <ChangePassword info={info} reset={reset} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Cập nhật ảnh đại diện"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <div className="flex flex-col items-center">
                    <div className={cx('avatar-box')}>
                        <div className={cx('img')}>
                            <Image
                                width={200}
                                height={200}
                                style={{ marginLeft: '-6px' }}
                                src={`http://localhost:3001/avatar/${info?.avatar}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div style={{ width: '100px' }}>
                        <Upload
                            {...props}
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            width="100px"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {uploadButton}
                        </Upload>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Profile;
