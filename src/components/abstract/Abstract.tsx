import { Fragment, useEffect, useState } from 'react';
import { Card, Typography, Flex, Spin, Empty } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

import AbstractTitle from '@components/abstract/AbstractTitle';
import AbstractFooter from '@components/abstract/AbstractFooter';
import AbstractGo from '@components/abstract/AbstractGo';
import AbstractDescription from '@components/abstract/AbstractDescription';

import { Meta } from '@components/common';
import RequestUtil from '@utils/APIRequestUtil';
import { getURLParameter, redirectTo } from '@utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '@utils/PageAddressUtil';

import { MetaFields, PostInfo } from '@types';
import PostCard from '@components/post-card/PostCard';

const { Text } = Typography;

const getMeta = (isSharingPage: boolean, title: string, description: string): MetaFields => {
    if (isSharingPage) {
        return {
            title: `发现一篇有趣的文章：「${title}」 - 博友圈 · 博客人的朋友圈！`,
            keywords: '文章分享',
            description: description
        };
    }

    return {
        title: `「${title}」的摘要 - 博友圈 · 博客人的朋友圈！`,
        keywords: '文章摘要',
        description: description
    };
};

interface AbstractProps {
    isSharingPage: boolean;
}

export default function Abstract({ isSharingPage }: AbstractProps) {
    const link = getURLParameter('link') || '';

    const [loaded, setLoaded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
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
        if (!linkParam) {
            setLoading(false);
            return;
        }

        setLoading(true);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(link);
    }, [link]);

    if (!link) {
        return (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <Empty
                    description="缺少文章链接参数"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    }

    return (
        <>
        <Meta meta={getMeta(isSharingPage, postInfo.title, postInfo.description)} />
        <PostCard showPinned={false} post={postInfo} descriptionRows={6} />
        </>
    );
}