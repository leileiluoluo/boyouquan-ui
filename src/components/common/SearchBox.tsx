import React from 'react';
import { useState } from 'react';
import { Flex, Input, Button, Space } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

interface SearchBoxProps {
    placeholder: string;
    gotoPage: string;
    sortType?: string | null;
}

export default function SearchBox({ placeholder, gotoPage, sortType }: SearchBoxProps): React.JSX.Element {
    const keyword = getURLParameter('keyword');
    const [searchTerm, setSearchTerm] = useState(keyword ?? '');
    const navigate = useNavigate();

    const doSearch = () => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return;

        const goTo =
            sortType != null
                ? `${gotoPage}?sort=${sortType}&keyword=${encodeURIComponent(trimmed)}`
                : `${gotoPage}?keyword=${encodeURIComponent(trimmed)}`;

        redirectTo(goTo);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            doSearch();
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        navigate(window.location.pathname, { replace: true });
    };

    return (
        <Flex align="center" justify="start" gap={8} style={{ width: '100%' }}>
            <Input
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                prefix={<SearchOutlined />}
                suffix={
                    searchTerm && (
                        <CloseOutlined
                            onClick={clearSearch}
                            style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.45)' }}
                        />
                    )
                }
                style={{ flex: 1 }}
            />
            <Button type="primary" onClick={doSearch}>
                搜索
            </Button>
        </Flex>
    );
}