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
    // 直接使用传递过来的 suggestions（已经在父组件处理好样式了）
    const options = suggestions;

    const handleSearch = (searchText) => {
        handleInputChange(type, searchText, setValue, setSuggestions);
    };

    const handleSelect = (selectedValue, option) => {
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
                filterOption={false}
            />
        </Flex>
    );
}