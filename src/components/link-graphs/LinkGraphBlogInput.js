import { Button, Container } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import blogNameAndDomainNameList from '../../json/blogNameAndDomainNameList.json';
import LinkGraphNotes from './LinkGraphNotes';

export default function LinkGraphBlogInput({ source, sourceSuggestions, handleInputChange, handleSelectSuggestion }) {
    return (
        <div style={{ flex: '1 1 200px', position: 'relative', minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>源博客</label>
            <input
                type="text"
                value={source}
                onChange={e => handleInputChange(e.target.value, setSource, setSourceSuggestions)}
                placeholder="输入源博客域名或名称"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E0' }}
            />
            {sourceSuggestions.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '38px',
                        left: 0,
                        right: 0,
                        border: '1px solid #CBD5E0',
                        borderRadius: '6px',
                        backgroundColor: '#fff',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        zIndex: 10,
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                    }}
                >
                    {sourceSuggestions.map(item => (
                        <li
                            key={item.value}
                            onClick={() => handleSelectSuggestion(item.value, setSource, setSourceSuggestions)}
                            style={{
                                padding: '4px 10px',       // 上下 padding 缩小
                                cursor: 'pointer',
                                fontSize: '12px',          // 字体变小
                            }}
                        >
                            {item.display}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
