import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';

export default function HomeLatestNews() {
    let animationControlStyle = { '--s': 4 };
    const [display, setDisplay] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/latest-news');
        const respBody = await resp.json();
        if (resp.status == 200 && respBody.length > 0) {
            const first = respBody[0];
            respBody.push(first);
            animationControlStyle = { '--s': respBody.length - 1 }
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
                    <img width="40px" height="40px" src="/assets/images/sites/latest_news/broadcast.png" />
                </div>
                <div className="content">
                    {
                        display ? <ul style={animationControlStyle}>
                            {
                                items.map(
                                    (item, index) => (
                                        <li key={index}><a href={item.link}>{item.title}</a></li>
                                    )
                                )
                            }
                        </ul> : ''
                    }
                </div>
            </div>
        </>
    )
}