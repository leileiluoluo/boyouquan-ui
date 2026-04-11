import { useEffect, useState } from 'react';
import { Flex } from 'antd';

import { MainContentHeader, Meta } from '@components/common';
import LinkGraphInput from '@components/link-graphs/LinkGraphInput';
import LinkGraphResult from '@components/link-graphs/LinkGraphResult';
import LinkGraphLatestSearch from '@components/link-graphs/LinkGraphLatestSearch';
import RequestUtil from '@utils/APIRequestUtil';
import { getURLParameter } from '@utils/CommonUtil';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: "连接系数 - 博友圈 · 博客人的朋友圈！",
    keywords: "连接系数",
    description: "连接系数，探索友链的世界。",
};

export default function LinkGraphPage() {
    const sourceDomainNameFromURL: string | null = getURLParameter('source');
    const targetDomainNameFromURL: string | null = getURLParameter('target');

    const [sourceDomainName, setSourceDomainName] = useState<string>(sourceDomainNameFromURL || '');
    const [targetDomainName, setTargetDomainName] = useState<string>(targetDomainNameFromURL || '');
    const [loading, setLoading] = useState<boolean>(false);
    const [allSourceBlogs, setAllSourceBlogs] = useState<string[]>([]);
    const [allTargetBlogs, setAllTargetBlogs] = useState<string[]>([]);

    const fetchSourceBlogs = async (): Promise<void> => {
        const resp = await RequestUtil.get(`/api/blog-intimacies/all-source-blogs`);

        const respBody = await resp.json();
        setAllSourceBlogs(respBody);
    };

    const fetchTargetBlogs = async (): Promise<void> => {
        const resp = await RequestUtil.get(`/api/blog-intimacies/all-target-blogs`);

        const respBody = await resp.json();
        setAllTargetBlogs(respBody);
    };

    useEffect(() => {
        fetchSourceBlogs();
        fetchTargetBlogs();
    }, []);

    return (
        <>
            <Meta meta={meta} />
            <Flex vertical gap={16}>
                <MainContentHeader content="一个友链连向另一个友链，形成了友链的海洋。一个博客与另一个博客的「赛博距离」有多远？欢迎使用「连接系数」来探索博客间的连接度！" />
                <LinkGraphInput
                    allSourceBlogs={allSourceBlogs}
                    allTargetBlogs={allTargetBlogs}
                    sourceDomainName={sourceDomainName}
                    targetDomainName={targetDomainName}
                    setSourceDomainName={setSourceDomainName}
                    setTargetDomainName={setTargetDomainName}
                    loading={loading}
                />
                <LinkGraphLatestSearch />
                <LinkGraphResult
                    sourceDomainName={sourceDomainName}
                    targetDomainName={targetDomainName}
                    setLoading={setLoading}
                />
            </Flex>
        </>
    );
}