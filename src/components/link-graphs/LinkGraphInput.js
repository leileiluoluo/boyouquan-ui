import { Box, Button, Container, Link, Text } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';
import blogNameAndDomainNameList from '../../json/blogNameAndDomainNameList.json';

export default function LinkGraphInput({
    sourceDomainName,
    targetDomainName,
    setSourceDomainName,
    setTargetDomainName,
    loading
}) {
    const [source, setSource] = useState(sourceDomainName);
    const [target, setTarget] = useState(targetDomainName);
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [targetSuggestions, setTargetSuggestions] = useState([]);

    useEffect(() => {
        setSource(sourceDomainName);
        setTarget(targetDomainName);
    }, [sourceDomainName, targetDomainName]);

    const handleInputChange = (value, setValue, setSuggestions) => {
        setValue(value);
        if (!value) {
            setSuggestions([]);
            return;
        }

        const filtered = blogNameAndDomainNameList
            .filter(
                item =>
                    item.blogName.toLowerCase().includes(value.toLowerCase()) ||
                    item.domainName.toLowerCase().includes(value.toLowerCase())
            )
            .map(item => ({ display: `${item.blogName} - ${item.domainName}`, value: item.domainName }));

        setSuggestions(filtered);
    };

    const handleSelectSuggestion = (selectedValue, setValue, setSuggestions) => {
        setValue(selectedValue);
        setSuggestions([]);
    };

    const handleSubmit = () => {
        if (!source || !target) {
            alert('请填写源站和目的站');
            return;
        }
        setSourceDomainName(source);
        setTargetDomainName(target);
    };

    return (
        <Container size="2">
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'flex-end',
                }}
            >
                {/* 源博客输入 */}
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

                {/* 目的博客输入 */}
                <div style={{ flex: '1 1 200px', position: 'relative', minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>目的博客</label>
                    <input
                        type="text"
                        value={target}
                        onChange={e => handleInputChange(e.target.value, setTarget, setTargetSuggestions)}
                        placeholder="输入目的博客域名或名称"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E0' }}
                    />
                    {targetSuggestions.length > 0 && (
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
                            {targetSuggestions.map(item => (
                                <li
                                    key={item.value}
                                    onClick={() => handleSelectSuggestion(item.value, setTarget, setTargetSuggestions)}
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

                {/* 确定按钮 */}
                <div style={{ flex: '0 0 auto' }}>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: loading ? '#A5B4FC' : '#4f46e5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        确定
                    </Button>

                    <Box mt="2">
                        <Text size="2" mt="2" style={{ color: '#6B7280', fontSize: '12px' }}>
                            * 友链数据从您的博客首页含有「link」的地址或带有「友链」、「圈子」、「关于」等字样的页面抓取。
                        </Text>
                    </Box>
                    <Box>
                        <Text size="2" mt="2" style={{ color: '#6B7280', fontSize: '12px' }}>
                            * 该数据集每月采集一次，这个频率不会对您的博客造成太大的压力，当前数据集采集于 2025/10/18。
                        </Text>
                    </Box>
                    <Box>
                        <Text size="2" mt="2" style={{ color: '#6B7280', fontSize: '12px' }}>
                            * 若您不想您的友链数据被采集，可以「<Link href="mailto:contact@boyouquan.com?subject=请将我移出友链抓取名单&body=我的博客地址：%0d%0a">联系站长</Link>」将您的博客加入对应的名单。
                        </Text>
                    </Box>
                </div>
            </div>
        </Container>
    );
}
