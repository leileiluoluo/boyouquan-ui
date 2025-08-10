import { Box, CheckboxGroup } from '@radix-ui/themes';

export default function GlobalCheckbox({ options, defaultIdOptions, handleChange }) {
    return (
        <Box>
            <CheckboxGroup.Root
                onValueChange={handleChange}
                defaultValue={defaultIdOptions}>
                {
                    options.map((option, index) => (
                        <CheckboxGroup.Item
                            key={index}
                            value={option.id}>
                            {option.label}
                        </CheckboxGroup.Item>
                    ))
                }
            </CheckboxGroup.Root>
        </Box>
    );
}