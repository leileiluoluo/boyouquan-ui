import { useState, useEffect } from 'react';

export default function SwitchSortType({ types }) {
    const [activeType, setActiveType] = useState('xxx');
    const getURLParameter = (name) => {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    useEffect(() => {
        let sort = getURLParameter('sort');
        console.log('sort: ' + sort);
        setActiveType(sort);
    }, []);

    console.log('activeType: ' + activeType);

    return (
        <div className="switch-sort-type">
            <ul className="menu">
                {
                    types.map(
                        (item, index) => (
                            <li key={index}>
                                <a href={item.href} title={item.name} class={item.href.endsWith(activeType) ? 'active' : (null == activeType && item.default ? 'active' : '')}>
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