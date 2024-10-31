const colorStyle = { color: '#cb2e58' };

export default function BlogRequestAddMainContentHeader() {
    return (
        <article className="first-entry home-info">
            <div className="entry-content">
                <p></p>
                <ul>
                    <li>
                        <strong>欢迎在这里提交您的博客，提交前请先仔细阅读「<a href="/about#submit-blog">博客需满足的要求</a>」，以减少被驳回的可能。确认满足要求后，请使用下方表单提交，一般在</strong>
                        <strong style={colorStyle}>&nbsp;24&nbsp;</strong>
                        <strong>小时之内会得到审核！</strong>
                        <strong>若您想对已提交的博客进行修改，请「<a href="mailto:contact@boyouquan.com?subject=博客信息修改&amp;body=博客地址：%0d%0a需要修改的信息：%0d%0a">给我们发送邮件</a>」，修改成功后会收到邮件通知！</strong>
                    </li>
                </ul>
                <p></p>
            </div>
        </article>
    )
}