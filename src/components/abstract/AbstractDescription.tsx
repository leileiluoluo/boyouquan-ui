import React from 'react';
import { Box, Text } from "@radix-ui/themes";

interface AbstractDescriptionProps {
    description: string;
}

export default function AbstractDescription({ description }: AbstractDescriptionProps): React.JSX.Element {
    return (
        <Box>
            <Text size="2" color="gray" style={{
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {description}
            </Text>
        </Box>
    )
}