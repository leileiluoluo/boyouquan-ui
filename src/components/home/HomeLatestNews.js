import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { SpeakerLoudIcon } from '@radix-ui/react-icons';

export default function HomeLatestNews() {
    const [size, setSize] = useState(0);
    const [display, setDisplay] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/latest-news');
        const respBody = await resp.json();
        if (resp.status == 200 && respBody.length > 0) {
            const first = respBody[0];
            respBody.push(first);
            setSize(respBody.length - 1);
            setItems(respBody);
            setDisplay(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="latest-news">
                <div className="icon">
                    <SpeakerLoudIcon />
                </div>
                <div className="content">
                    {
                        display && <ul style={{ '--s': size }}>
                            {
                                items.map(
                                    (item, index) => (
                                        <li key={index}><a href={item.link}>{item.title}</a></li>
                                    )
                                )
                            }
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}