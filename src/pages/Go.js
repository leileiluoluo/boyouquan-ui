import { useEffect, useState } from 'react';
import getURLParameter from '../utils/CommonUtil';

export default function Go() {
    let from = getURLParameter('from') || '';
    let link = getURLParameter('link') || '';

    const [item, setItem] = useState({
        'link': '',
    });

    const fetchData = async (link, from) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/go?link=${link}&from=${from}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(prevItem=> ({
                ...prevItem,
                ['link']: resp.link,
              }));

            window.location.href = resp.link;
        } catch (error) {
            console.error(error);
            window.location.href = link;
        }
    };

    useEffect(() => {
        fetchData(link, from);
    }, [link, from]);
}