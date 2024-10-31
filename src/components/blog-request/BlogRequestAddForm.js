const inputFontSizeStyle = { fontSize: '14px' };
const noticeStyle = { marginTop: '18px', fontSize: '12px' };
const noticeFontStyle = { color: '#cb2e58' };
const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

export default function BlogRequestAddForm({ formData, error, handleChange, handleSubmit, isAdminPage }) {
    return (
        <>
            {
                isAdminPage ? '' : <header className="post-header">
                    <h3 className="post-title">
                        提交博客
                    </h3>
                </header>
            }
            <div className="blog-requests">
                <form onSubmit={handleSubmit}>
                    <div className="requests-form-container">
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博客名称 *</p>
                                {error.code == 'blog_request_name_invalid' ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="name" placeholder="您的博客名称" id="name" value={formData.name} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>RSS 地址 *</p>
                                {(error.code == 'blog_request_rss_address_invalid'
                                    || error.code == 'blog_request_rss_address_black_list'
                                    || error.code == 'blog_request_rss_address_exists')
                                    ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="rssAddress" placeholder="用于抓取文章" id="rssAddress" value={formData.rssAddress} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博主邮箱 *</p>
                                {error.code == 'blog_request_admin_email_invalid' ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <input style={inputFontSizeStyle} name="adminEmail" placeholder="用于展示 Gravatar 头像，以及获取通知" id="adminEmail" value={formData.adminEmail} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="key-value-entry">
                            <div className="label">
                                <p>博客描述 *</p>
                                {error.code == 'blog_request_description_invalid' ? <p style={errorStyle}>{error.message}</p> : ''}
                            </div>
                            <div className="field">
                                <textarea style={inputFontSizeStyle} name="description" placeholder="描述一下您的博客，建议 100 字以内" id="description" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className="key-value-entry">
                            <input type="submit" value="提交" />
                        </div>

                        {
                            isAdminPage ? '' : <div style={noticeStyle}>
                                <p><a style={noticeFontStyle} href="mailto:contact@boyouquan.com?subject=提交博客时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">提交遇到问题？我要联系站长！</a></p>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}