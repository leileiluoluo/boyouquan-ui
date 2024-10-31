const inputFontSizeStyle = { fontSize: '14px' };
const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

export default function LoginForm({ formData, error, handleChange, handleSubmit }) {
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
                                {(error.code == 'login_username_invalid' || error.code == 'login_username_password_invalid') 
                                ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="username" placeholder="账号" id="username" value={formData.username} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>密码 *</p>
                                {error.code == 'login_password_invalid' ? <p style={errorStyle}>{error.message}</p> : ''}
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