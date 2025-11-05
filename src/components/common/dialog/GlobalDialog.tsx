import React from 'react';
import { Dialog, Button, Flex } from '@radix-ui/themes';

export default function GlobalDialog({ title, titleColor, message, closeButtonName, dialogOpen, setDialogOpen }) {
    return <>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title color={titleColor}>{title}</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    {message}
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            {closeButtonName}
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    </>;
}