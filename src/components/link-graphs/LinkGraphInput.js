import { Button, Container } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import blogNameAndDomainNameList from '../../json/blogNameAndDomainNameList.json';
import LinkGraphNotes from './LinkGraphNotes';
import LinkGraphBlogInput from './LinkGraphBlogInput';

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
                <LinkGraphBlogInput
                    source={source}
                    sourceSuggestions={sourceSuggestions}
                    handleInputChange={handleInputChange}
                    handleSelectSuggestion={handleSelectSuggestion} />

                {/* 目的博客输入 */}
                <LinkGraphBlogInput
                    source={target}
                    sourceSuggestions={targetSuggestions}
                    handleInputChange={handleInputChange}
                    handleSelectSuggestion={handleSelectSuggestion} />

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

                    <LinkGraphNotes />
                </div>
            </div>
        </Container>
    );
}
