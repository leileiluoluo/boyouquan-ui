import { Button, Flex, Tooltip } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import LinkGraphNotes from './LinkGraphNotes';
import LinkGraphBlogInput from './LinkGraphBlogInput';
import { ArrowUpDown } from 'lucide-react';

export default function LinkGraphInput({
    allSourceBlogs,
    allTargetBlogs,
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

    const handleInputChange = (type, value, setValue, setSuggestions) => {
        setValue(value);
        if (!value) {
            setSuggestions([]);
            return;
        }

        let blogNameAndDomainNameList = [];
        if (type === 'source') {
            blogNameAndDomainNameList = allSourceBlogs;
        } else if (type === 'target') {
            blogNameAndDomainNameList = allTargetBlogs;
        }

        const filtered = blogNameAndDomainNameList
            .filter(
                item =>
                    item.blogName.toLowerCase().includes(value.toLowerCase()) ||
                    item.domainName.toLowerCase().includes(value.toLowerCase())
            )
            .map(item => ({
                display: `${item.blogName} - ${item.domainName}`,
                blogName: item.blogName,
                value: item.domainName
            }));

        setSuggestions(filtered);
    };

    const handleSelectSuggestion = (selectedValue, setValue, setSuggestions) => {
        setValue(selectedValue);
        setSuggestions([]);
    };

    const handleSwap = () => {
        [setSourceDomainName(target), setTargetDomainName(source)];
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
        <Flex gap="1" direction="column">
            <Flex justify="between" gap="2" align="center">
                <LinkGraphBlogInput
                    type="source"
                    placeholder="源博客域名或名称"
                    value={source}
                    setValue={setSource}
                    suggestions={sourceSuggestions}
                    setSuggestions={setSourceSuggestions}
                    handleInputChange={handleInputChange}
                    handleSelectSuggestion={handleSelectSuggestion} />

                <Tooltip content="对调">
                    <ArrowUpDown style={{ transform: 'rotate(90deg)' }} onClick={handleSwap} />
                </Tooltip>

                <LinkGraphBlogInput
                    type="target"
                    placeholder="目的博客域名或名称"
                    value={target}
                    setValue={setTarget}
                    suggestions={targetSuggestions}
                    setSuggestions={setTargetSuggestions}
                    handleInputChange={handleInputChange}
                    handleSelectSuggestion={handleSelectSuggestion} />

                <Button
                    size="2"
                    onClick={handleSubmit}
                    disabled={loading}>
                    探索
                </Button>
            </Flex>
            <LinkGraphNotes />
        </Flex>
    );
}
