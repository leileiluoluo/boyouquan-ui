import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/RequestUtil';
import { getBlogAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';

export default function HomePopularBlogsHeader() {
    const [blogs, seBlogs] = useState([]);

    const fetchData = async () => {
        const resp = await RequestUtil.get('https://www.boyouquan.com/api/popular-blogs');
        const respBody = await resp.json();
        seBlogs(respBody);
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
                    blogs.map(
                        (blog, index) => (
                            <div className="blogger-one" key={index}>
                                <a href={getBlogAddress(blog.domainName)}><img src={getGravatarImageFullURL(blog.blogAdminLargeImageURL)} /></a>
                                <span className="tooltiptext">{blog.name}</span>
                            </div>
                        )
                    )
                }
            </div>
        </article>
    )
}