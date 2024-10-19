import { useState, useEffect } from 'react';
import getURLParameter from '../../utils/CommonUtil';

export default function SwitchSortType({ types }) {
    const [activeType, setActiveType] = useState('xxx');

    useEffect(() => {
        let sort = getURLParameter('sort');
        setActiveType(sort);
    }, []);

    return (
        <div className="switch-sort-type">
            <ul className="menu">
                {
                    types.map(
                        (item, index) => (
                            <li key={index}>
                                <a href={item.href} title={item.name} className={item.href.endsWith(activeType) ? 'active' : (null == activeType && item.default ? 'active' : '')}>
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}