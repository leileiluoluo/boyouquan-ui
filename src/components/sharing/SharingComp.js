import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getURLParameter from '../../utils/CommonUtil';
import formatDateStr from '../../utils/DateUtil';
import { Helmet } from 'react-helmet';

export default function SharingComp() {
    const [loaded, setLoaded] = useState(false);
    const [item, setItem] = useState({});

    const { id } = useParams();

    const fetchData = async (link) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/posts/by-link?link=${link}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(resp);
            setLoaded(true);
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
            {loaded ?
                <Fragment>
                    <Helmet>
                        <title>{`发现一篇有趣的文章：「${item.title}」- 博友圈 · 博客人的朋友圈！`}</title>
                        <meta name="keywords" content='文章分享' />
                        <meta name="description" content={item.description} />
                        <meta property="og:title" content={`发现一篇有趣的文章：「${item.title}」- 博友圈 · 博客人的朋友圈！`} />
                        <meta property="og:description" content={item.description} />
                    </Helmet>
                    <article className="share post-entry">
                        <header className="entry-header sharing">
                            <h4>发现一篇有趣的文章：「<a href={`/go?from=website&link=${encodeURIComponent(item.link)}`}><strong>{item.title}</strong></a>」</h4>
                        </header>
                        <div className="entry-content">
                            <p>{item.description}</p>
                        </div>
                        <div className="source-site-go">
                            <a href={`/go?from=website&link=${encodeURIComponent(item.link)}`}><h4>[阅读原文]</h4></a>
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
                                · <span>{formatDateStr(item.publishedAt)}</span>
                            </div>
                            <div className="flex-item">
                                · <span>{item.linkAccessCount}</span>次浏览
                            </div>
                        </footer>
                    </article>
                </Fragment> : ''
            }
        </>
    )
}