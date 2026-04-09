import React from 'react';

import { Meta } from '@components/common';
import Article from '@components/article/Article';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '404 - 博友圈 · 博客人的朋友圈！',
    keywords: '404',
    description: '404'
};

const titleStyle: React.CSSProperties = { textAlign: 'center' };
const contentStyle: React.CSSProperties = { textAlign: 'center', fontSize: '60px' };

const content: JSX.Element = (
    <>
        <h4 style={titleStyle}>抱歉，未找到您要访问的页面！</h4>
        <p style={contentStyle}>404</p>
    </>
);

export default function NotFoundPage() {
    return (
        <>
            <Meta meta={meta} />
            <Article title="" content={content} />
        </>
    );
}

