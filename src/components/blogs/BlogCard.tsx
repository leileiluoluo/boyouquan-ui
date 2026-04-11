import React from 'react';
import { Card, Flex } from 'antd';
import BlogCardDescription from './BlogCardDescription';
import BlogCardFooter from './BlogCardFooter';
import BlogCardHeader from './BlogCardHeader';
import BlogCardLatestPosts from './BlogCardLatestPosts';
import BlogCardSummary from './BlogCardSummary';

export default function BlogCard({ blog, posts, publishedAtHighlight, accessCountHighlight, createTimeHighlight }) {
    return (
        <Card style={{ padding: 16, width: '100%' }}>
            <Flex vertical gap={4}>
                <BlogCardHeader
                    name={blog.name}
                    domainName={blog.domainName}
                    address={blog.address}
                    blogAdminLargeImageURL={blog.blogAdminLargeImageURL}
                    nameSize="3"
                />
                <BlogCardDescription description={blog.description} />
                <BlogCardSummary
                    postCount={blog.postCount}
                    accessCount={blog.accessCount}
                    collectedAt={blog.collectedAt}
                    domainRegisteredAt={blog.domainNameRegisteredAt}
                    latestPublishedAt={blog.latestPublishedAt}
                    publishedAtHighlight={publishedAtHighlight}
                    accessCountHighlight={accessCountHighlight}
                    createTimeHighlight={createTimeHighlight} />
                <BlogCardLatestPosts statusOk={blog.statusOk} posts={posts} />
                <BlogCardFooter
                    statusOk={blog.statusOk}
                    submittedInfo={blog.submittedInfo}
                    submittedInfoTip={blog.submittedInfoTip} />
            </Flex>
        </Card>
    );
}