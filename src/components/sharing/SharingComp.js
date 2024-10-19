import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getURLParameter from '../../utils/CommonUtil';

export default function SharingComp() {
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

              document.title = '博客「' + resp.title + '」审核详情 - 博友圈 · 博客人的朋友圈！';
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
    <article className="share post-entry">
        <header className="entry-header sharing">
            <h4>我在博友圈发现一篇有意思的文章：「<a href={`/go?from=website&link=${item.link}`}><strong>{item.title}</strong></a>」，快点击阅读原文看看吧！</h4>
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