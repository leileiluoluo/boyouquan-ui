import { useState } from 'react';
import { setCookie } from '../../utils/CookieUtil';


export default function LoginComp() {
    const inputFontSizeStyle = { fontSize: '14px' };
    const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });

    const postData = async (formData) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/admin/login`, {
                method: 'POST',
                headers: {
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
                    ['username']: resp.message.username,
                    ['password']: resp.message.password
                });
            } else {
                setCookie("sessionId", resp.result);

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
                <h3 className="post-title">
                    管理员登录
                </h3>
            </header>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="login-form-container">
                        <div className="key-value-entry">
                            <div className="label">
                                <p>账号 *</p>
                                {errorMessage.username ? <p style={errorStyle}>{errorMessage.username}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="username" placeholder="账号" id="username" value={formData.username} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>密码 *</p>
                                {errorMessage.password ? <p style={errorStyle}>{errorMessage.password}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} type="password" name="password" placeholder="密码" id="password" value={formData.password} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <input type="submit" value="登录" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}