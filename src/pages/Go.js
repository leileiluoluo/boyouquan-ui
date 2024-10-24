import { useEffect } from 'react';
import getURLParameter from '../utils/CommonUtil';
import Meta from '../components/common/Meta';

export default function Go() {
    const meta = {
        title: '网址跳转 - 博友圈 · 博客人的朋友圈！',
        keywords: '网址跳转, 博友圈',
        description: '博友圈网址跳转。'
    }

    let from = getURLParameter('from') || '';
    let link = getURLParameter('link') || '';

    const fetchData = async (link, from) => {
        try {
            link = encodeURIComponent(link);

            let url = `https://www.boyouquan.com/api/go?from=${from}&link=${link}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();

            window.location.href = resp.link;
        } catch (error) {
            console.error(error);
            window.location.href = link;
        }
    };

    useEffect(() => {
        fetchData(link, from);
    }, [link, from]);

    return (
        <Meta meta={meta} />
    )
}