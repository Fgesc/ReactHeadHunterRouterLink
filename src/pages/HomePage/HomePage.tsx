import { useCallback, useEffect, useMemo, useRef } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { Button, Container, Group, Stack, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTypedDispatch, useTypedSelector } from "../../hooks/useRedux";
import { setQuery, fetchJobs, setCityFilter, setSkills } from "../../reducers/JobsSlice";
import { JobFilters } from "../../components/JobFilters/JobFilters";
import { CityTabs } from "../../components/CityTabs/CityTabs";
import SearchIcon from "../../assets/search.svg";
import styles from "./homePage.module.css";
import { DEFAULT_CITY, DEFAULT_QUERY, DEFAULT_SKILLS } from "../../constants/constantsMain";

export const HomePage = () => {
    const firstLoad = useRef(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery("(max-width: 1023px)");

    const dispatch = useTypedDispatch();
    const { query, cityFilter, skills } = useTypedSelector((state) => state.jobs);
    const trimmedQuery = useMemo(() => query.trim(), [query]);

    useEffect(() => {
        const queryParam = searchParams.get("query") || DEFAULT_QUERY;
        const cityParam = searchParams.get("city") || DEFAULT_CITY;
        const skillsParam = searchParams.get("skills")?.split(",") || DEFAULT_SKILLS;

        dispatch(setQuery(queryParam));
        dispatch(setCityFilter(cityParam));
        dispatch(setSkills(skillsParam));

        dispatch(fetchJobs({ query: queryParam, ignoreLastQueryCheck: true }));
        firstLoad.current = false;
    }, [dispatch]);

    useEffect(() => {
        if (firstLoad.current) return;
        const text = trimmedQuery || DEFAULT_QUERY;
        dispatch(fetchJobs({ query: text, ignoreLastQueryCheck: true }));
    }, [dispatch, cityFilter]);

    useEffect(() => {
        const params: Record<string, string> = {};
        if (query.trim()) params.query = query;
        if (cityFilter !== "all") params.city = cityFilter;
        if (skills.length) params.skills = skills.join(",");

        setSearchParams(params);
    }, [query, cityFilter, skills, setSearchParams]);

    const handleSearch = useCallback(async () => {
        if (!trimmedQuery.length) return;
        await dispatch(fetchJobs({ query: trimmedQuery }));
    }, [dispatch, trimmedQuery]);

    return (
        <main style={{ paddingBottom: "84px" }}>
            <Group
                justify="center"
                gap={126}
                mih={114}
                p={16}
                style={{ borderBottom: `1px solid ${theme.other.colors.preLight}` }}
            >
                <Container m={0}>
                    <Title order={2}>Список вакансий</Title>
                    <Text c={theme.other.colors.gray} fw={500} fz={20}>
                        по профессии Frontend-разработчик
                    </Text>
                </Container>

                <Container w="auto" h={42} p={0} m={0} maw={508}>
                    <Group gap={12}>
                        <TextInput
                            data-testid="search-input"
                            flex={1}
                            size="md"
                            value={query}
                            placeholder={isSmallScreen ? "Поиск" : "Должность или название вакансии..."}
                            onChange={(e) => dispatch(setQuery(e.currentTarget.value))}
                            leftSection={<img src={SearchIcon} alt="поиск" width={16} height={16} />}
                            className={styles.search_input}
                            styles={{ input: { border: `1px solid ${theme.other.colors.preLight}` } }}
                        />
                        <Button
                            data-testid="search-button"
                            onClick={handleSearch}
                            w={93}
                            radius="sm"
                            size="md"
                            variant="filled"
                            styles={{ label: { fontWeight: 400, fontSize: "16px" } }}
                        >
                            Найти
                        </Button>
                    </Group>
                </Container>
            </Group>

            <Group justify="center" align="flex-start" gap={24}>
                <JobFilters />
                <Stack gap={0}>
                    <CityTabs />
                    <Outlet/>
                </Stack>
            </Group>
        </main>
    );
};

