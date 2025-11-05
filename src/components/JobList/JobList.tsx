import { useCallback } from "react";
import { Box, Group, Loader, Stack, Text } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../hooks/useRedux";
import { setPage } from "../../reducers/JobsSlice";
import { JobCard } from "../JobCard/JobCard";
import { Pagination } from "../Pagination/Pagination";
import { useFilterJobs } from "../../hooks/useFilterJobs";
import { usePaginateJobs } from "../../hooks/usePaginateJobs";
import styles from "./jobList.module.css";

export const JobList = () => {
    const dispatch = useTypedDispatch();
    const { loading, error, page, jobs, itemsPerPage, skills } = useTypedSelector(state => state.jobs);

    const filteredJobs = useFilterJobs(jobs, skills);
    const { visibleJobs, totalPages } = usePaginateJobs(filteredJobs, page, itemsPerPage);
    const isEmpty = filteredJobs.length === 0 && !error;

    const handlePageChange = useCallback(
            (newPage: number) => dispatch(setPage(newPage)),
            [dispatch]
    );

    return (
        <Box data-testid="jobs-list" className={styles.jobList} w={659} mt={24} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {error && <Text c="red" ta="center" mt="md" data-testid="jobs-error">{error}</Text>}
        {loading ? (
            <Group justify="center" mt="lg" style={{ flexGrow: 1 }}>
                <Loader data-testid="custom-loader" color="blue" size="lg" />
            </Group>
        ) : (
            <>
                {isEmpty? (
                    <Text c="gray" ta="center" mt="md">По выбранным фильтрам ничего не найдено</Text>
                ) : (
                    <>
                        <Stack gap="md" style={{ transition: "opacity 0.3s ease" }}>
                            {visibleJobs.map(job => <JobCard key={job.id} job={job} />)}
                        </Stack>
                        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />}
                    </>
                )}
            </>
        )}
        </Box>
    );
};






