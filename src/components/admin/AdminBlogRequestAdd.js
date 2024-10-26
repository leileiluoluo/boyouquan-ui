import { useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';

export default function AdminBlogRequestAddComp() {
    const redStyle = { color: 'red' };
    const inputFontSizeStyle = { fontSize: '14px' };
    const noticeStyle = { marginTop: '18px', fontSize: '12px' };
    const noticeFontStyle = { color: '#cb2e58' };
    const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

    const [formData, setFormData] = useState({ name: '', rssAddress: '', adminEmail: '', description: '' });
    const [errorMessage, setErrorMessage] = useState({ name: '', rssAddress: '', adminEmail: '', description: '' });

    const postData = async (formData) => {
        try {
            const sessionId = getCookie("sessionId");

            const response = await fetch(`https://www.boyouquan.com/api/admin/blog-requests/add`, {
                method: 'POST',
                headers: {
                    'sessionId': sessionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();

            if (resp.status == 'error') {
                setErrorMessage({
                    ...errorMessage,
                    ['name']: resp.message.name,
                    ['rssAddress']: resp.message.rssAddress,
                    ['adminEmail']: resp.message.adminEmail,
                    ['description']: resp.message.description,
                });
            } else {
                setTimeout(function () {
                    window.location.href = '/admin/blog-requests';
                }, 3 * 1000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        postData(formData);
    };

    return (
        <>
            <header className="post-header">
                <h3 className="post-title" style={redStyle}>
                    提交博客 - 管理页面
                </h3>
            </header>
            <div className="blog-requests">
                <form onSubmit={handleSubmit}>
                    <div className="requests-form-container">
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博客名称 *</p>
                                {errorMessage.name ? <p style={errorStyle}>{errorMessage.name}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="name" placeholder="您的博客名称" id="name" value={formData.name} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>RSS 地址 *</p>
                                {errorMessage.rssAddress ? <p style={errorStyle}>{errorMessage.rssAddress}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="rssAddress" placeholder="用于抓取文章" id="rssAddress" value={formData.rssAddress} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博主邮箱 *</p>
                                {errorMessage.adminEmail ? <p style={errorStyle}>{errorMessage.adminEmail}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="adminEmail" placeholder="用于展示 Gravatar 头像，以及获取通知" id="adminEmail" value={formData.adminEmail} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博客描述 *</p>
                                {errorMessage.description ? <p style={errorStyle}>{errorMessage.description}</p> : ''}
                            </div>
                            <div className="field">
                                <textarea style={inputFontSizeStyle} name="description" placeholder="描述一下您的博客，建议 100 字以内" id="description" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className="key-value-entry">
                            <input type="submit" value="提交" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}