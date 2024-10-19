import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';


export default function BlogRequestContainerComp() {
    const style = { display: 'table', tableLayout: 'fixed' }

    const [item, setItem] = useState({
        'name': '',
        'description': '',
        'rssAddress': '',
        'adminEmail': '',
        'requestedAt': '',
        'statusInfo': ''
    });

    const { id } = useParams();

    const fetchData = async (id) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blog-requests/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(prevItem => ({
                ...prevItem,
                ['name']: resp.name,
                ['description']: resp.description,
                ['rssAddress']: resp.rssAddress,
                ['adminEmail']: resp.adminEmail,
                ['requestedAt']: resp.requestedAt,
                ['statusInfo']: resp.statusInfo,
            }));

            document.title = '博客「' + resp.name + '」审核详情 - 博友圈 · 博客人的朋友圈！';
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    return (
        <>
            <Helmet>
                <meta name="keywords" content={item.name} />
                <meta name="description" content={item.description} />
                <meta property="og:title" content={item.name} />
                <meta property="og:description" content={item.description} />
                <script src="/assets/js/charts/frappe-charts@1.6.2.min.umd.js" type="text/javascript"></script>
            </Helmet>
            <header className="post-header">
                <h3 className="post-title">{`博客「${item.name}」审核详情`}</h3>
            </header>
            <div className="blog-requests">
                <div className="requests-container">
                    <table style={style}>
                        <tbody>
                            <tr>
                                <td width="20%">
                                    <span>博客名称</span>
                                </td>
                                <td width="80%">
                                    <p><a href="">{item.name}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博客描述</span>
                                </td>
                                <td width="80%">
                                    <p>{item.description}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>RSS 地址</span>
                                </td>
                                <td width="80%">
                                    <p><a href={item.rssAddress}>{item.rssAddress}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博主邮箱</span>
                                </td>
                                <td width="80%">
                                    <p>{item.adminEmail}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>提交时间</span>
                                </td>
                                <td width="80%">
                                    <p>{item.requestedAt}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>审核状态</span>
                                </td>
                                <td width="80%">
                                    <p>{item.statusInfo}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}