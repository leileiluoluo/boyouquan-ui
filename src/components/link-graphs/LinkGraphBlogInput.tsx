import React from 'react';
import { Flex, AutoComplete } from 'antd';

export default function LinkGraphBlogInput({ 
    type, 
    placeholder, 
    value, 
    setValue, 
    suggestions, 
    setSuggestions, 
    handleInputChange, 
    handleSelectSuggestion 
}) {
    // 转换 suggestions 格式为 AutoComplete 需要的格式
    const options = suggestions.map(suggestion => ({
        label: (
            <Flex justify="space-between" gap={8}>
                <span style={{ color: '#1677ff', fontSize: 12 }}>{suggestion.blogName}</span>
                <span style={{ color: '#faad14', fontSize: 12 }}>{suggestion.value}</span>
            </Flex>
        ),
        value: suggestion.value
    }));

    const handleSearch = (searchText) => {
        handleInputChange(type, searchText, setValue, setSuggestions);
    };

    const handleSelect = (selectedValue) => {
        handleSelectSuggestion(selectedValue, setValue, setSuggestions);
    };

    return (
        <Flex style={{ width: '100%' }}>
            <AutoComplete
                style={{ width: '100%' }}
                placeholder={placeholder}
                value={value}
                onChange={setValue}
                onSearch={handleSearch}
                onSelect={handleSelect}
                options={options}
                allowClear
                filterOption={false} // 禁用内置过滤，使用自定义过滤
            />
        </Flex>
    );
}