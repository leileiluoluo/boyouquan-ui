import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Grid, Card, Flex, Box, Text } from '@radix-ui/themes';
import BlogCardHeader from '../blogs/BlogCardHeader';
import BlogCardDescription from '../blogs/BlogCardDescription';

export default function RandomBlogs({ domain }) {
    const [blogs, setBlogs] = useState([]);

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`/api/blogs/random-blogs?domainName=${domain}`);

        const respBody = await resp.json();
        setBlogs(respBody);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="2">
                <Text size="2" color="gray">随机链接</Text>
                <Flex direction="column">
                    <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                        {
                            blogs.map(
                                (blog, index) => (
                                    <Box key={index}>
                                        <Card style={{ padding: 'var(--space-4)' }}>
                                            <Flex direction="column" gap="1">
                                                <BlogCardHeader
                                                    name={blog.name}
                                                    domainName={blog.domainName}
                                                    address={blog.address}
                                                    blogAdminLargeImageURL={blog.blogAdminLargeImageURL}
                                                    nameSize="2"
                                                />
                                                <BlogCardDescription description={blog.description} />
                                            </Flex>
                                        </Card>
                                    </Box>
                                ))
                        }
                    </Grid>
                </Flex>
            </Flex>
        </Card>
    )
}