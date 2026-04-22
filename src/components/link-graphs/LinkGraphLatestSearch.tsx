import React, { useEffect, useState } from 'react';
import { AudioOutlined, SoundOutlined } from '@ant-design/icons'; // antd 官方喇叭图标
import RequestUtil from '../../utils/APIRequestUtil';

export default function LinkGraphLatestSearch() {
    const [size, setSize] = useState(0);
    const [display, setDisplay] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/blog-intimacies/search-histories');
        const respBody = await resp.json();
        if (resp.status === 200 && respBody.length > 0) {
            const first = respBody[0];
            respBody.push(first);
            setSize(respBody.length - 1);
            setItems(respBody);
            setDisplay(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="latest-news">
            {/* 替换为 Ant Design 喇叭图标 */}
            <div className="icon">
                <SoundOutlined />
            </div>
            <div className="content">
                {display && (
                    <ul style={{ '--s': size } as React.CSSProperties}>
                        {items.map((item, index) => (
                            <li key={index}>
                                <a href={item.link}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}