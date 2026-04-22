import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import RequestUtil from '../../utils/APIRequestUtil';
import PopularBlog from './PopularBlog';
import HomePopularBlogsHeaderFallBack from './HomePopularBlogsHeaderFallback';

export default function HomePopularBlogsHeader() {
    const [blogs, setBlogs] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/popular-blogs?size=20');
        const respBody = await resp.json();
        setDataReady(true);
        setBlogs(respBody);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!dataReady) {
        return <Spin />
    }

    return (
        <Flex 
            gap={16}
            wrap="wrap"
            align="center"
            justify="center"
        >
            {
                blogs.map(
                    (blog, index) => (
                        <PopularBlog 
                            key={index}
                            type={blog.type}
                            name={blog.blogName}
                            domainName={blog.blogDomainName}
                            blogAdminLargeImageURL={blog.blogAdminLargeImageURL} />
                    )
                )
            }
        </Flex>
    )
}