import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { ADMIN_RECOMMENDED_POSTS_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import AdminMenuHeader from './AdminMenuHeader';
import AdminMenu from './AdminMenu';
import AdminPostImageAddForm from './post-images/AdminPostImageAddForm';

export default function AdminPostImageAdd() {
    let link = getURLParameter('link') || '';

    const [postInfo, setPostInfo] = useState({});
    const [postImages, setPostImages] = useState([]);
    const [formData, setFormData] = useState({ link: link });
    const [error, setError] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('/api/admin/post-images', JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const imageURL = formData['imageURL'];
        if (undefined === imageURL) {
            setError({ code: 'image_not_selected', message: '您未选择任何图片' });
            return;
        }

        postData(formData);
    };

    const fetchData = async (link) => {
        const linkEncoded = encodeURIComponent(link);
        const resp = await RequestUtil.get(`/api/posts/by-link?link=${linkEncoded}`);

        const respBody = await resp.json();
        if (resp.status == 200) {
            setPostInfo(respBody);
        }

        const resp2 = await RequestUtil.get(`/api/post-images/raw-images/by-link?link=${linkEncoded}`);
        const respBody2 = await resp2.json();
        if (resp2.status == 200) {
            setPostImages(respBody2);
        }
    };

    useEffect(() => {
        fetchData(link);
    }, [link]);

    return (
        <>
            <AdminMenuHeader title='文章配图 - 管理页面' />
            <AdminMenu />
            <AdminPostImageAddForm
                postInfo={postInfo}
                postImages={postImages}
                formData={formData}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isAdminPage='true' />
        </>
    )
}