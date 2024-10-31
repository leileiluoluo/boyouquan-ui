import { useEffect } from 'react';
import getURLParameter from '../utils/CommonUtil';
import Meta from '../components/common/Meta';
import RequestUtil from '../utils/RequestUtil';

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
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/go?from=${from}&link=${linkEncoded}`);
        window.location.href = resp.link;
    };

    useEffect(() => {
        fetchData(link, from);
    }, [link, from]);

    return (
        <Meta meta={meta} />
    )
}