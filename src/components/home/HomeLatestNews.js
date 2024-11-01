import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/RequestUtil';

export default function HomeLatestNews() {
    const animationControlStyle = { '--s': '4' };
    const [display, setDisplay] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        const resp = await RequestUtil.get('https://www.boyouquan.com/api/latest-news');
        const respBody = await resp.json();
        setItems(respBody);
        setDisplay(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {
                display ? <div className="latest-news">
                    <div className="icon">
                        <img width="40px" height="40px" src="/assets/images/sites/latest_news/broadcast.png" />
                    </div>
                    <div className="content">
                        <ul style={animationControlStyle}>
                            {
                                items.map(
                                    (item, index) => (
                                        <li key={index}><a href={item.link}>{item.title}</a></li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div> : ''
            }
        </>
    )
}