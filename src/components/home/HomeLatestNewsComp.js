import { useEffect, useState } from 'react';

export default function HomeLatestNewsComp() {
    const animationControlStyle = { '--s': '4' };
    const [display, setDisplay] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/latest-news`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItems(resp);
            setDisplay(true);
        } catch (error) {
            console.error(error);
        }
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