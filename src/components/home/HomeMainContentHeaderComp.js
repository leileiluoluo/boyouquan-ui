import { useEffect, useState } from 'react';

export default function HomeMainContentHeaderComp() {
    const [items, setItems] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/popular-blogs`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItems(resp);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <article className="first-entry home-info">
            <div className="entry-content">
                <p></p>
                <ul>
                    <li>
                        <strong>您有多久没有读过一篇长文了？那些记忆中有趣的博客还在更新吗？博友圈是博客人的专属朋友圈，连接还在写博的博友，让那属于文字的时代延续光辉！</strong>
                    </li>
                </ul>
                <p></p>
            </div>
            <div className="popular-bloggers">
                {
                    items.map(
                        (item, index) => (
                            <div className="blogger-one" key={index}>
                                <a href={`/blogs/${item.domainName}`}><img src={`https://www.boyouquan.com/${item.blogAdminLargeImageURL}`} /></a>
                                <span className="tooltiptext">{item.name}</span>
                            </div>
                        )
                    )
                }
            </div>
        </article>
    )
}