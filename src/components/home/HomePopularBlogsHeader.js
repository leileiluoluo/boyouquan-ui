import { useEffect, useState } from 'react';
import { Skeleton, Flex } from '@radix-ui/themes';
import RequestUtil from '../../utils/APIRequestUtil';
import PopularBlog from './PopularBlog';

export default function HomePopularBlogsHeader() {
    const [blogs, setBlogs] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/popular-blogs');
        const respBody = await resp.json();
        setDataReady(true);
        setBlogs(respBody);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!dataReady) {
        return (
            <Flex gap="4"
                wrap="wrap"
                align="center"
                justify="center">
                {Array.from({ length: 14 }).map((_, index) => (
                    <Skeleton key={index} width="32px" height="32px" style={{ borderRadius: '50%' }} />
                ))}
            </Flex>
        );
    }

    return (
        <Flex gap="4"
            wrap="wrap"
            align="center"
            justify="center">
            {
                blogs.slice(0, 14).map(
                    (blog, index) => (
                        <PopularBlog key={index}
                            name={blog.name}
                            domainName={blog.domainName}
                            blogAdminLargeImageURL={blog.blogAdminLargeImageURL} />
                    )
                )
            }
        </Flex>
    )
}