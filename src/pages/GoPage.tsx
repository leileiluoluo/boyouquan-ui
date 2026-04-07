import { useEffect } from 'react';

import Meta from '@components/common/Meta';
import RequestUtil from '@utils/APIRequestUtil';
import { getURLParameter, redirectTo } from '@utils/CommonUtil';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '网址跳转 - 博友圈 · 博客人的朋友圈！',
    keywords: '网址跳转, 博友圈',
    description: '博友圈网址跳转。'
};

export default function GoPage() {
    const from = getURLParameter('from') || '';
    const link = getURLParameter('link') || '';

    const fetchData = async (link: string, from: string): Promise<void> => {
        const linkEncoded = encodeURIComponent(link);
        const resp = await RequestUtil.get(`/api/go?from=${from}&link=${linkEncoded}`);

        const respBody = await resp.json();

        const meta = document.createElement('meta');
        meta.name = 'referrer';
        meta.content = 'origin';
        document.head.appendChild(meta);

        setTimeout(() => {
            redirectTo(respBody.link);
        }, 50);
    };

    useEffect(() => {
        fetchData(link, from);
    }, [link, from]);

    return (
        <Meta meta={meta} />
    )
}