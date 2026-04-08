import { Fragment, useEffect, useState } from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';

import AbstractTitle from '@components/abstract/AbstractTitle';
import AbstractFooter from '@components/abstract/AbstractFooter';
import AbstractGo from '@components/abstract/AbstractGo';
import AbstractDescription from '@components/abstract/AbstractDescription';

import { Meta } from '@components/common';
import RequestUtil from '@utils/APIRequestUtil';
import { getURLParameter, redirectTo } from '@utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '@utils/PageAddressUtil';

import { MetaFields, PostInfo } from '@types';

const getMeta = (isSharingPage: string | undefined, title: string, description: string): MetaFields => {
    if (isSharingPage) {
        return {
            title: `发现一篇有趣的文章：「${title}」 - 博友圈 · 博客人的朋友圈！`,
            keywords: '文章分享',
            description: description
        };
    }

    return {
        title: `文章摘要：「${title}」 - 博友圈 · 博客人的朋友圈！`,
        keywords: '文章摘要',
        description: description
    };
};

interface AbstractProps {
    isSharingPage?: string;
}

export default function Abstract({ isSharingPage }: AbstractProps) {
    const link = getURLParameter('link') || '';

    const [loaded, setLoaded] = useState<boolean>(false);
    const [postInfo, setPostInfo] = useState<PostInfo>({
        title: '',
        description: '',
        link: '',
        blogName: '',
        blogDomainName: '',
        blogStatusOk: false,
        publishedAt: ''
    });

    const fetchData = async (linkParam: string): Promise<void> => {
        if (!linkParam) return;

        const linkEncoded = encodeURIComponent(linkParam);
        const resp = await RequestUtil.get(`/api/posts/by-link?link=${linkEncoded}`);

        if (typeof resp === 'string') {
            redirectTo(NOT_FOUND_ADDRESS);
            return;
        }

        const respBody = await resp.json();
        if (resp.status !== 200) {
            redirectTo(NOT_FOUND_ADDRESS);
        } else {
            setPostInfo(respBody as PostInfo);
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
                                isSharingPage || postInfo.blogStatusOk ? '' : <Text size="1" color="crimson">* 原始文章地址可能暂时无法访问，本页为文章的摘要信息</Text>
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