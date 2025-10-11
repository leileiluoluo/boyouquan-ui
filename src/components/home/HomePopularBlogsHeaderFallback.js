import { Flex, Skeleton } from '@radix-ui/themes';

export default function HomePopularBlogsHeaderFallBack() {
    return (
        <Flex gap="4"
            wrap="wrap"
            align="center"
            justify="center">
            {Array.from({ length: 16 }).map((_, index) => (
                <Skeleton key={index} width="28px" height="28px" style={{ borderRadius: '50%' }} />
            ))}
        </Flex>
    );
}