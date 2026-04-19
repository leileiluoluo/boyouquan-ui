import { Button, Flex, Tooltip, AutoComplete, Space } from 'antd';
import { useState, useEffect } from 'react';
import LinkGraphNotes from './LinkGraphNotes';
import LinkGraphBlogInput from './LinkGraphBlogInput';
import { SwapOutlined } from '@ant-design/icons';
import GlobalDialog from '../common/dialog/GlobalDialog';

export default function LinkGraphInput({
    allSourceBlogs,
    allTargetBlogs,
    sourceDomainName,
    targetDomainName,
    setSourceDomainName,
    setTargetDomainName,
    loading
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState({ code: '', message: '' });
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
                    (item.blogName || '').toLowerCase().includes(value.toLowerCase()) ||
                    (item.domainName || '').toLowerCase().includes(value.toLowerCase())
            )
            .map(item => ({
                label: (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <span>{item.blogName || item.domainName}</span>
                        <span style={{ color: '#666', marginLeft: 16 }}>{item.domainName}</span>
                    </div>
                ),
                value: item.domainName
            }));

        setSuggestions(filtered);
    };

    const handleSelectSuggestion = (selectedValue, setValue, setSuggestions) => {
        setValue(selectedValue);
        setSuggestions([]);
    };

    const handleSwap = () => {
        setSourceDomainName(target);
        setTargetDomainName(source);
        setSource(target);
        setTarget(source);
    };

    const handleSubmit = () => {
        if (!source || !target) {
            setError({ code: 'params_invalid', message: '请填写源博客和目的博客域名' });
            setDialogOpen(true);
            return;
        }
        setSourceDomainName(source);
        setTargetDomainName(target);
    };

    return (
        <Flex vertical gap={4}>
            {/* PC 横排，移动端自动分行 */}
            <div className="link-graph-input-row">
                <style jsx>{`
                    @media (max-width: 768px) {
                        .link-graph-input-row {
                            display: flex !important;
                            flex-direction: column;
                            gap: 12px;
                        }
                        .swap-icon {
                            text-align: center;
                        }
                    }
                    @media (min-width: 769px) {
                        .link-graph-input-row {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                        }
                        .input-item {
                            flex: 1;
                        }
                    }
                `}</style>

                <div className="input-item">
                    <LinkGraphBlogInput
                        type="source"
                        placeholder="源博客域名或名称"
                        value={source}
                        setValue={setSource}
                        suggestions={sourceSuggestions}
                        setSuggestions={setSourceSuggestions}
                        handleInputChange={handleInputChange}
                        handleSelectSuggestion={handleSelectSuggestion} />
                </div>

                <div className="swap-icon">
                    <Tooltip title="对调">
                        <SwapOutlined
                            style={{ fontSize: 20, cursor: 'pointer' }}
                            onClick={handleSwap}
                        />
                    </Tooltip>
                </div>

                <div className="input-item">
                    <LinkGraphBlogInput
                        type="target"
                        placeholder="目的博客域名或名称"
                        value={target}
                        setValue={setTarget}
                        suggestions={targetSuggestions}
                        setSuggestions={setTargetSuggestions}
                        handleInputChange={handleInputChange}
                        handleSelectSuggestion={handleSelectSuggestion} />
                </div>

                <Button
                    type="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ width: '100%' }}
                >
                    探索
                </Button>
            </div>

            <LinkGraphNotes />

            <GlobalDialog
                title={'' != error.code ? '错误提示' : '提示'}
                titleColor={'' != error.code ? 'crimson' : ''}
                message={error.message}
                closeButtonName={'' != error.code ? '返回' : '关闭窗口'}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </Flex>
    );
}