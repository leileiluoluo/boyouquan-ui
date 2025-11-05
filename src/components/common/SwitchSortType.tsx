import React from 'react';
import { useState, useEffect } from 'react';
import { Flex, TabNav } from '@radix-ui/themes';
import { getURLParameter } from '../../utils/CommonUtil';

export default function SwitchSortType({ types }) {
    const [activeType, setActiveType] = useState('xxx');

    useEffect(() => {
        let sort = getURLParameter('sort');
        setActiveType(sort);
    }, []);

    return (
        <Flex id="switch-sort-type">
            <TabNav.Root style={{ fontWeight: 'bold' }}>
                {
                    types.map(
                        (item, index) => (
                            <TabNav.Link key={index} href={item.href} active={item.href.endsWith(activeType) ? true : (null == activeType && item.default)}>
                                {item.name}
                            </TabNav.Link>
                        )
                    )
                }
            </TabNav.Root>
        </Flex>
    )
}