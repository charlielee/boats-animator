import { Loader, Stack } from "@mantine/core";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiLoaderProps {
  className?: string;
  message: string;
}

export const UiLoader = ({ className, message }: UiLoaderProps) => {
  return (
    <Stack p="md" w="100%" h="100%" align="center" justify="center" className={className}>
      {message}
      <Loader color={SemanticColor.PRIMARY} />
    </Stack>
  );
};
