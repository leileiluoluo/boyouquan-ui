import React from 'react';
import { useState, useEffect } from 'react';
import { Flex, Tabs } from 'antd';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';

export default function SwitchSortType({ types }) {
    const [activeKey, setActiveKey] = useState('');

    useEffect(() => {
        let sort = getURLParameter('sort');
        if (!sort) {
            // 没有 sort 参数时，找到默认项
            const defaultItem = types.find(item => item.default);
            if (defaultItem) {
                const urlParams = new URLSearchParams(defaultItem.href.split('?')[1]);
                const sortValue = urlParams.get('sort') || 'recommended';
                setActiveKey(sortValue);
            }
        } else {
            setActiveKey(sort);
        }
    }, [types]);

    const handleTabChange = (key: string) => {
        setActiveKey(key);
        // 根据 key 找到对应的完整 href 并跳转
        const targetItem = types.find(item => {
            const urlParams = new URLSearchParams(item.href.split('?')[1]);
            const sortValue = urlParams.get('sort') || 'recommended';
            return sortValue === key;
        });
        if (targetItem) {
            redirectTo(targetItem.href);  // 使用原有的 redirectTo 方法
        }
    };

    const tabItems = types.map((item) => {
        const urlParams = new URLSearchParams(item.href.split('?')[1]);
        const sortValue = urlParams.get('sort') || 'recommended';
        return {
            key: sortValue,
            label: item.name,
        };
    });

    return (
        <Flex style={{ marginTop: '-8px' }} id="switch-sort-type">
            <Tabs
                activeKey={activeKey}
                onChange={handleTabChange}
                items={tabItems}
                tabBarStyle={{ fontWeight: 'bold' }}
            />
        </Flex>
    );
}