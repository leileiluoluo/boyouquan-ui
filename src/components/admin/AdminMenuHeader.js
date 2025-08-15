import { Heading } from '@radix-ui/themes';

export default function AdminMenuHeader({ title }) {
    return (
        <Heading size="3" weight="bold">
            {title}
        </Heading>
    )
}