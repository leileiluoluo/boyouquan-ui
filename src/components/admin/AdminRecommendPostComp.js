import { useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';

export default function AdminRecommendPostComp() {
    const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

    const [formData, setFormData] = useState({ link: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const operation = async (url, method, formData) => {
        try {
            const sessionId = getCookie("sessionId");

            const response = await fetch(url, {
                method: method,
                headers: {
                    'sessionId': sessionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();
            if (resp.status == 'error') {
                setErrorMessage(resp.message);
            } else {
                setTimeout(function () {
                    window.location.href = '/admin/recommended-posts';
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

    const recommend = (e) => {
        e.preventDefault();

        const url = `https://www.boyouquan.com/api/admin/recommended-posts/add`;
        operation(url, 'POST', formData);
    }

    return (
        <>
            <header className="post-header">
                <h3 className="post-title">推荐文章 - 管理页面</h3>
            </header>
            <div class="blog-requests">
                <form onSubmit={recommend}>
                    <div className="requests-form-container">
                        <div className="key-value-entry">
                            <div className="label">
                                <p>文章链接 *</p>
                                {errorMessage ? <p style={errorStyle}>{errorMessage}</p> : ''}
                            </div>
                            <div className="field">
                                <input name="link" id="link" onChange={handleChange} />
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