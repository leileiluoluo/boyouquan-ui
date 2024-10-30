import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/RequestUtil';

export default function RandomBlogs({ domain }) {
    const [blogs, setBlogs] = useState([]);

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/blogs/random-blogs?domainName=${domain}`);
        setBlogs(resp);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <div className="blog-detail-random-blogs">
            <div className="blogs-title">
                <h4>随机链接</h4>
            </div>
            <div className="blogs-container">
                {
                    blogs.map(
                        (blog, index) => (
                            <div key={index} className="blog-entry">
                                <header className="blog-entry-header">
                                    <div className="blogger-icon">
                                        <a href={`/blogs/${blog.domainName}`}>
                                            <img src={`https://www.boyouquan.com${blog.blogAdminLargeImageURL}`} />
                                        </a>
                                    </div>
                                    <div className="blogger-basic">
                                        <div className="icon-and-title">
                                            <div className="flex-item">
                                                <a href={`/blogs/${blog.domainName}`}><h4>{blog.name}</h4></a>
                                            </div>
                                        </div>
                                        <div className="domain">
                                            <div className="flex-item-left">
                                                <div className="domain-name">
                                                    <a href={`/go?from=website&link=${encodeURIComponent(blog.address)}`}>{blog.domainName}</a>
                                                </div>
                                                <div className="link">
                                                    <a href={`/go?from=website&link=${encodeURIComponent(blog.address)}`}>
                                                        <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                                            <path d="M15 3h6v6"></path>
                                                            <path d="M10 14L21 3"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </header>
                                <div className="description">
                                    <p>{blog.description}</p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}