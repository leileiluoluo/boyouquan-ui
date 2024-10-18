import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getURLParameter from '../../utils/CommonUtil';

export default function AbstractComp() {
    const style = { display: 'table', tableLayout: 'fixed'}

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
            setItem(prevItem=> ({
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let link = getURLParameter('link') || '';
        fetchData(link);
    }, [id]);

    document.title = '「' + item.title + '」的摘要信息 - 博友圈 · 博客人的朋友圈！';

    return (
        <>
    <article className="abstract post-entry">
        <header className="entry-header sharing">
            <h4>「<a href={`/go?from=website&link=${item.link}`}><strong>{item.title}</strong></a>」的摘要信息</h4>
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