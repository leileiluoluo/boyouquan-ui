import { useState, useEffect } from 'react';
import { theme, Flex, Segmented } from 'antd';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';

const { useToken } = theme;

export default function SwitchSortType({ types }) {
    const [activeKey, setActiveKey] = useState('');

    const { token } = useToken();

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
            redirectTo(targetItem.href);
        }
    };

    // 生成 Segmented 选项
    const segmentOptions = types.map((item) => {
        const urlParams = new URLSearchParams(item.href.split('?')[1]);
        const sortValue = urlParams.get('sort') || 'recommended';
        return {
            value: sortValue,
            label: item.name,
        };
    });

    return (
        <Flex id="switch-sort-type">
            <Segmented
                value={activeKey}
                onChange={handleTabChange}
                options={segmentOptions}
                style={{
                    // 整体背景
                    backgroundColor: '#dee3f8',
                    borderRadius: '8px',
                    padding: '2px',
                    fontWeight: 500,
                }}
                // 选中项样式
                thumbStyle={{
                    backgroundColor: token.colorPrimary,
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                }}
                // 文字样式
                labelStyle={{
                    color: '#130101',
                    fontWeight: 600,
                    padding: '4px 12px',
                }}
            />
        </Flex>
    );
}