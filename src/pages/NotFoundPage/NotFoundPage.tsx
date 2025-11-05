import { Stack, Title, Text, useMantineTheme, Center, Group, Button, Image } from "@mantine/core";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    const theme = useMantineTheme();

    return (
        <Center mt={72}>
            <Stack gap={32} maw={707} p={32} bg={theme.other.colors.white} bdrs={12} mt={0}>
                <Group wrap="nowrap" gap={0}>
                    <Stack maw={508} gap={12}>
                        <Title order={1} fw={700} fz={34} data-testid="notFoundTitle">
                            Упс! Такой страницы не существует
                        </Title>

                        <Text fw={400} fz={18} data-testid="notFoundText">
                            Давайте перейдём к началу.
                        </Text>
                    </Stack>
                    <Group justify="flex-start">
                        <Button
                            component={Link}
                            to={"/"}
                            data-testid={"notFound-view-btn"}
                            w={135}
                            h={42}
                            p={0}
                            variant="filled"
                            size="sm"
                            radius="sm"
                            color="indigo.7"
                            styles={{ label: { fontWeight: 400, fontSize: "14px" } }}
                            c={theme.other.colors.white}

                        >
                            На главную
                        </Button>
                    </Group>
                </Group>
                <Image src="/ReactHeadHunterRouterLink/cat.gif"  alt="NotFound" maw={640} data-testid="not-found-gif" bdrs={12}/>
            </Stack>
        </Center>
    );
}