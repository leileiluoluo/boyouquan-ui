import { Box, Link, Strong, Text } from '@radix-ui/themes';

export default function BlogRequestAddMainContentHeader() {
    return (
        <Box>
            <Text size="2" color="gray">
                欢迎在这里提交您的博客，提交前请先仔细阅读「<Link color="indigo" href="/about#submit-blog">博客需满足的要求</Link>」，以减少被驳回的可能。确认满足要求后，请使用下方表单提交，一般在 <Strong>24</Strong> 小时之内会得到审核！若您想对已提交的博客进行修改，请「<Link color="indigo" href="mailto:contact@boyouquan.com?subject=博客信息修改&amp;body=博客地址：%0d%0a需要修改的信息：%0d%0a">给我们发送邮件</Link>」，修改成功后会收到邮件通知！
            </Text>
        </Box>
    )
}