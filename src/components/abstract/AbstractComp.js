import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getURLParameter from '../../utils/CommonUtil';
import { Helmet } from 'react-helmet';

export default function AbstractComp() {
    const [item, setItem] = useState({
        'link': '',
        'blogDomainName': '',
        'title': '',
        'description': '',
        'publishedAt': '',
        'blogName': '',
        'blogAddress': '',
        'linkAccessCount': '',
        'blogAdminMediumImageURL': ''
    });

    const { id } = useParams();

    const fetchData = async (link) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/posts/by-link?link=${link}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(prevItem => ({
                ...prevItem,
                ['link']: resp.link,
                ['blogDomainName']: resp.blogDomainName,
                ['title']: resp.title,
                ['description']: resp.description,
                ['publishedAt']: resp.publishedAt,
                ['blogName']: resp.blogName,
                ['blogAddress']: resp.blogAddress,
                ['linkAccessCount']: resp.linkAccessCount,
                ['blogAdminMediumImageURL']: resp.blogAdminMediumImageURL,
            }));

            document.title = '文章摘要：「' + resp.title + '」 - 博友圈 · 博客人的朋友圈！';
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let link = getURLParameter('link') || '';
        fetchData(link);
    }, [id]);

    return (
        <>
            <Helmet>
                <meta name="keywords" content='文章摘要' />
                <meta name="description" content={item.description} />
                <meta property="og:title" content={`文章摘要：「${item.title}<」 - 博友圈 · 博客人的朋友圈！`} />
                <meta property="og:description" content={item.description} />
            </Helmet>
            <article className="abstract post-entry">
                <header className="entry-header sharing">
                    <h4>文章摘要：「<a href={`/go?from=website&link=${item.link}`}><strong>{item.title}</strong></a>」</h4>
                </header>
                <div className="entry-content">
                    <p>{item.description}</p>
                </div>
                <div className="source-site-go">
                    <a href={`/go?from=website&link=${item.link}`}><h4>[阅读原文]</h4></a>
                </div>
                <footer className="entry-footer">
                    <div className="flex-item">
                        <a href={`/blogs/${item.blogDomainName}`}>
                            <img src={`https://www.boyouquan.com${item.blogAdminMediumImageURL}`} />
                        </a>
                    </div>
                    <div className="flex-item">
                        <a href={`/blogs/${item.blogDomainName}`}>{item.blogName}</a>
                    </div>
                    <div className="flex-item">
                        · <span>{item.publishedAt}</span>
                    </div>
                    <div className="flex-item">
                        · <span>{item.linkAccessCount}</span>次浏览
                    </div>
                </footer>
            </article>
        </>
    )
}