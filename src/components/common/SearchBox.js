import { useEffect, useState } from 'react';
import { TextField, IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { useNavigate } from 'react-router-dom';

export default function SearchBox({ placeholder, gotoPage, sortType }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            const keyword = searchTerm.trim();

            let goTo = (null != sortType)
                ? `${gotoPage}?sort=${sortType}&keyword=${encodeURIComponent(keyword)}`
                : `${gotoPage}?keyword=${encodeURIComponent(keyword)}`;

            redirectTo(goTo);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        navigate(window.location.pathname, { replace: true });
    };

    useEffect(() => {
        const keyword = getURLParameter('keyword');
        if (null !== keyword) {
            setSearchTerm(keyword);
        }
    });

    return (
        <TextField.Root
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}>
            <TextField.Slot>
                <MagnifyingGlassIcon />
            </TextField.Slot>
            <TextField.Slot>
                <IconButton size="1" variant="ghost" onClick={clearSearch}>
                    <Cross2Icon />
                </IconButton>
            </TextField.Slot>
        </TextField.Root>
    )
}