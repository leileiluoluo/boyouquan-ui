import React from 'react';
import { Flex, Skeleton } from 'antd';

export default function HomePopularBlogsHeaderFallBack() {
    return (
        // 布局：居中对齐、间距、换行 完全和原代码一致
        <Flex 
            gap={16} 
            wrap 
            align="center" 
            justify="center"
        >
            {/* 渲染 16 个圆形骨架屏 */}
            {Array.from({ length: 16 }).map((_, index) => (
                <Skeleton
                    key={index}
                    // 圆形：28x28px
                    avatar={{ size: 28 }}
                    // 关闭文字占位，只显示圆形
                    active
                />
            ))}
        </Flex>
    );
}