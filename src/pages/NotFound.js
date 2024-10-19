import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';

export default function NotFound() {
    const titleStyle = { textAlign: 'center' };
    const contentStyle = { textAlign: 'center', fontSize: '100px' };
    return (
        <>
            <CommonHeader />
            <main className="main">
                <article className="post-single">
                    <div className="post-content">
                        <h3 style={titleStyle}>抱歉，未找到您要访问的页面！</h3>
                        <p style={contentStyle}>404</p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}