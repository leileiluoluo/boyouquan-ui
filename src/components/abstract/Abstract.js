import { Fragment, useEffect, useState } from 'react';
import AbstractNotice from './AbstractNotice';
import RequestUtil from '../../utils/APIRequestUtil';
import AbstractTitle from './AbstractTitle';
import AbstractFooter from './AbstractFooter';
import AbstractGo from './AbstractGo';
import AbstractDescription from './AbstractDescription';
import Meta from '../common/Meta';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';
import { Card, Flex } from '@radix-ui/themes';

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
        const resp = await RequestUtil.get(`/api/posts/by-link?link=${linkEncoded}`);

        const respBody = await resp.json();
        if (resp.status != 200) {
            redirectTo(NOT_FOUND_ADDRESS);
        } else {
            setPostInfo(respBody);
            setLoaded(true);
        }
    };

    useEffect(() => {
        fetchData(link);
    }, [link]);

    return (
        <>
            {loaded ?
                <Fragment>
                    <Meta meta={getMeta(isSharingPage, postInfo.title, postInfo.description)} />
                    <Card>
                        <Flex direction="column" gap="1">
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
                        </Flex>
                    </Card>
                </Fragment> : ''
            }
        </>
    )
}