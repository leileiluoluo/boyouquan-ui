import React from 'react';
import { useState } from 'react';
import { Flex, Box, Button, TextField, IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { useNavigate } from 'react-router-dom';

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            doSearch();
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        navigate(window.location.pathname, { replace: true });
    };

    return (
        <Flex align="center" justify="start" gap="8px" width="100%">
            <Box flexGrow="1">
                <TextField.Root
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ width: '100%' }}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon />
                    </TextField.Slot>
                    <TextField.Slot>
                        <IconButton size="1" variant="ghost" onClick={clearSearch}>
                            <Cross2Icon />
                        </IconButton>
                    </TextField.Slot>
                </TextField.Root>
            </Box>

            <Box>
                <Button type="button" onClick={doSearch}>
                    搜索
                </Button>
            </Box>
        </Flex>
    );
}
