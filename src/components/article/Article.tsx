import React from 'react';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

interface ArticleProps {
    title: string;
    content: React.ReactNode;
    publishedAt?: string;
}

export default function Article({ title, content, publishedAt }: ArticleProps): React.JSX.Element {
    return (
        <Flex direction="column" gap="2">
            <Box className="post-header">
                <Heading size="3">{title}</Heading>
                <Box mt="1">{
                    publishedAt ? <Text color="gray" size="2">
                        {publishedAt}
                    </Text> : ''
                }</Box>
            </Box>
            <Card mt="2" mb="2" p="3">
                {content}
            </Card>
        </Flex>
    )
}