export default function SiteFooter() {
    const footerStyle = { marginBottom: '14px' };
    const footerTextStyle = { fontSize: '12px' };
    const spanStyle = { margin: '6px 6px' };
    return (
        <footer className="footer">
            <div style={footerStyle}>
                <span style={spanStyle}><a href="/sponsor">赞助本站</a></span>|
                <span style={spanStyle}><a href="/release-notes">发布历史</a></span>|
                <span style={spanStyle}><a href="/about">关于本站</a></span>|
                <span style={spanStyle}><a href="/thanks">感谢名单</a></span>|
                <span style={spanStyle}><a href="/similar-sites">同类网站</a></span>
            </div>
            <span style={footerTextStyle}>本站使用「<a href="https://github.com/leileiluoluo/boyouquan-ui">博友圈开源程序</a>」创建，使用「<a href="https://curl.qcloud.com/okTsvSrj">腾讯云</a>」提供服务！</span>
            <br />
            <span style={footerTextStyle}><a href="https://beian.miit.gov.cn/">辽ICP备2022012085号-2</a></span>
            <br />
            <span style={footerTextStyle}>Copyright © 2023-2024 <a href="https://www.boyouquan.com/home">博友圈</a></span>
        </footer>
    )
}