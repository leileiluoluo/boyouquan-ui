import React from 'react';
import { Heading } from '@radix-ui/themes';

interface AdminMenuHeaderProps {
    title: string;
}

export default function AdminMenuHeader({ title }: AdminMenuHeaderProps): React.JSX.Element {
    return (
        <Heading size="3" weight="bold">
            {title}
        </Heading>
    )
}