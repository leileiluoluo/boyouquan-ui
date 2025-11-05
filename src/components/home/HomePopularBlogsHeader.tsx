import React from 'react';
import { useEffect, useState } from 'react';
import { Flex } from '@radix-ui/themes';
import RequestUtil from '../../utils/APIRequestUtil';
import PopularBlog from './PopularBlog';
import HomePopularBlogsHeaderFallBack from './HomePopularBlogsHeaderFallback';

export default function HomePopularBlogsHeader() {
    const [blogs, setBlogs] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/popular-blogs?size=16');
        const respBody = await resp.json();
        setDataReady(true);
        setBlogs(respBody);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!dataReady) {
        return <HomePopularBlogsHeaderFallBack />
    }

    return (
        <Flex gap="4"
            wrap="wrap"
            align="center"
            justify="center">
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