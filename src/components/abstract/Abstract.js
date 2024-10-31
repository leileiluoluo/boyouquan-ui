import { Fragment, useEffect, useState } from 'react';
import AbstractNotice from './AbstractNotice';
import RequestUtil from '../../utils/RequestUtil';
import AbstractTitle from './AbstractTitle';
import AbstractFooter from './AbstractFooter';
import AbstractGo from './AbstractGo';
import AbstractDescription from './AbstractDescription';
import Meta from '../common/Meta';
import { getURLParameter } from '../../utils/CommonUtil';

const getMeta = (isSharingPage, title, description) => {
    if (isSharingPage) {
        return {
            title: `发现一篇有趣的文章：「${title}」 - 博友圈 · 博客人的朋友圈！`,
            keywords: '文章分享',
            description: description
        }
    }

    return {
        title: `文章摘要：「${title}」 - 博友圈 · 博客人的朋友圈！`,
        keywords: '文章摘要',
        description: description
    }
}

export default function Abstract({ isSharingPage }) {
    let link = getURLParameter('link') || '';

    const [loaded, setLoaded] = useState(false);
    const [postInfo, setPostInfo] = useState({});

    const fetchData = async (link) => {
        const linkEncoded = encodeURIComponent(link);
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/posts/by-link?link=${linkEncoded}`);

        setPostInfo(resp);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData(link);
    }, [link]);

    return (
        <>
            {loaded ?
                <Fragment>
                    <Meta meta={getMeta(isSharingPage, postInfo.title, postInfo.description)} />
                    <article className={isSharingPage ? 'share post-entry' : 'abstract post-entry'}>
                        {
                            isSharingPage || postInfo.blogStatusOk ? '' : <AbstractNotice />
                        }
                        <AbstractTitle isSharingPage={isSharingPage} title={postInfo.title} link={postInfo.link} />
                        <AbstractDescription description={postInfo.description} />
                        <AbstractGo link={postInfo.link} />
                        <AbstractFooter
                            blogName={postInfo.blogName}
                            blogDomainName={postInfo.blogDomainName}
                            blogAdminMediumImageURL={postInfo.blogAdminMediumImageURL}
                            publishedAt={postInfo.publishedAt}
                            linkAccessCount={postInfo.linkAccessCount} />
                    </article>
                </Fragment> : ''
            }
        </>
    )
}