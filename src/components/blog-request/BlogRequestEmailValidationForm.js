const inputFontSizeStyle = { fontSize: '14px' };
const noticeStyle = { marginTop: '18px', fontSize: '12px' };
const noticeFontStyle = { color: '#cb2e58' };
const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

export default function BlogRequestEmailValidationForm({ formData, error, adminEmailInputRef, sendCodeInputRef, emailValidationCodeInputRef, emailValidationButtonRef, handleChange, handleValidationButtonClick, handleSubmit, isAdminPage }) {
    return (
        <>
            {
                isAdminPage ? '' : <header className="post-header">
                    <h3 className="post-title">
                        验证邮箱
                    </h3>
                </header>
            }
            <div className="blog-requests">
                <form>
                    <div className="requests-form-container">
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博主邮箱 *</p>
                                {error.code == 'blog_request_admin_email_invalid' ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} ref={adminEmailInputRef} name="adminEmail" placeholder="博主身份凭据，用于鉴定博客拥有权、展示 Gravatar 头像和获取邮件通知" id="adminEmail" value={formData.adminEmail} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="key-value-entry">
                            <div className="get-email-validation-code">
                                <button type="button" ref={sendCodeInputRef} onClick={handleValidationButtonClick} >发送验证码</button>
                            </div>
                        </div>

                        <div className="key-value-entry" ref={emailValidationCodeInputRef} style={{ display: "none" }}>
                            <div className="label">
                                <p>验证码 *</p>
                                {error.code == 'blog_request_email_validation_code_invalid' ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <input type="number" style={inputFontSizeStyle} name="emailVerificationCode" placeholder="上述邮箱收到的 6 位验证码" id="emailVerificationCode" value={formData.emailVerificationCode} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="key-value-entry" ref={emailValidationButtonRef} style={{ display: "none" }}>
                            <input type="submit" onClick={handleSubmit} value="验证" />
                        </div>

                        {
                            isAdminPage ? '' : <div style={noticeStyle}>
                                <p><a style={noticeFontStyle} href="mailto:contact@boyouquan.com?subject=提交博客时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">收不到验证码？我要联系站长！</a></p>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}