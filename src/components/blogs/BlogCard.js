import BlogCardDescription from './BlogCardDescription';
import BlogCardFooter from './BlogCardFooter';
import BlogCardHeader from './BlogCardHeader';
import BlogCardLatestPosts from './BlogCardLatestPosts';
import BlogCardSummary from './BlogCardSummary';

export default function BlogCard({ blog, posts, publishedAtHighlight, accessCountHighlight }) {
    return (
        <article className="blog-entry">
            <BlogCardHeader
                name={blog.name}
                domainName={blog.domainName}
                address={blog.address}
                blogAdminLargeImageURL={blog.blogAdminLargeImageURL}
            />
            <BlogCardDescription description={blog.description} />
            <BlogCardSummary
                postCount={blog.postCount}
                accessCount={blog.accessCount}
                collectedAt={blog.collectedAt}
                latestPublishedAt={blog.latestPublishedAt}
                publishedAtHighlight={publishedAtHighlight}
                accessCountHighlight={accessCountHighlight} />
            <BlogCardLatestPosts statusOk={blog.statusOk} posts={posts} />
            <BlogCardFooter
                statusOk={blog.statusOk}
                submittedInfo={blog.submittedInfo}
                submittedInfoTip={blog.submittedInfoTip} />
        </article>
    )
}