import { useEffect } from 'react';
import Meta from '../components/common/Meta';
import RequestUtil from '../utils/APIRequestUtil';
import { getURLParameter, redirectTo } from '../utils/CommonUtil';

const meta = {
    title: '网址跳转 - 博友圈 · 博客人的朋友圈！',
    keywords: '网址跳转, 博友圈',
    description: '博友圈网址跳转。'
};

export default function GoPage() {
    const from = getURLParameter('from') || '';
    const link = getURLParameter('link') || '';

    const fetchData = async (link, from) => {
        const linkEncoded = encodeURIComponent(link);
        const resp = await RequestUtil.get(`/api/go?from=${from}&link=${linkEncoded}`);

        const respBody = await resp.json();
        redirectTo(respBody.link);
    };

    useEffect(() => {
        fetchData(link, from);
    }, [link, from]);

    return (
        <Meta meta={meta} />
    )
}