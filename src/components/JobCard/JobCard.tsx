import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, Group, Stack, Title, Text, useMantineTheme } from "@mantine/core";
import { formatSalary } from "../../utils/formatSalary";
import type { typeJob } from "../../types/typeJob";
import styles from "./jobCard.module.css";

type JobCardProps = {
    job: typeJob;
};

export const JobCard = memo(({ job }: JobCardProps) => {
    const theme = useMantineTheme();
    const salaryText = formatSalary(job.salary);
    const [hovered, setHovered] = useState(false);
    const [hoveredVacancy, sethoveredVacancy] = useState(false);

    return (
        <Card
            data-testid={`job-item-${job.id}`}
            w={659}
            p={16}
            className={styles.job_card}
        >
            <Stack gap={16}>
                <Stack gap={8}>
                    <Title order={3} c="indigo.9" fw={500} fz={20} data-testid={`job-title-${job.id}`}>
                        {job.name}
                    </Title>

                    <Group>
                        {salaryText && (
                            <Text fw={400} fz={16} c={theme.other.colors.black1} data-testid={`job-salary-${job.id}`}>
                                {salaryText}
                            </Text>
                        )}

                        {job.experience?.name && (
                            <Text fw={400} fz={14} c={theme.other.colors.gray} data-testid={`job-experience-${job.id}`}>
                                {job.experience.name}
                            </Text>
                        )}
                    </Group>
                </Stack>

                <Stack h={76} gap={0}>
                    <Text fw={400} fz={14} c={theme.other.colors.gray} mb={8} data-testid={`job-employer-${job.id}`}>
                        {job.employer?.name || "Компания не указана"}
                    </Text>

                    {job.schedule?.name && (
                        <Box
                            w="fit-content"
                            px={8}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "6px",
                                backgroundColor: theme.colors.indigo[9],
                            }}
                        >
                            <Text fw={700} fz={10} c="white" data-testid={`job-schedule-${job.id}`}>
                                {job.schedule.name.toUpperCase()}
                            </Text>
                        </Box>
                    )}

                    <Text fw={400} fz={16} c={theme.other.colors.black1} data-testid={`job-area-${job.id}`}>
                        {job.area?.name || "Регион не указан"}
                    </Text>
                </Stack>

                <Group>
                    <Button
                        component={Link}
                        to={`/vacancies/${job.id}`}
                        data-testid={`job-view-btn-${job.id}`}
                        w={172}
                        h={36}
                        p={0}
                        variant="filled"
                        size="sm"
                        radius="sm"
                        color={theme.other.colors.black1}
                        style={{ opacity: hoveredVacancy ? 0.7 : 1 }}
                        styles={{ label: { fontWeight: 400, fontSize: "14px" } }}
                        onMouseEnter={() => sethoveredVacancy(true)}
                        onMouseLeave={() => sethoveredVacancy(false)}
                    >
                        Смотреть вакансию
                    </Button>

                    <Button
                        data-testid={`job-apply-btn-${job.id}`}
                        component="a"                
                        href={job.url}              
                        target="_blank"
                        rel="noopener noreferrer"             
                        w={131}
                        h={36}
                        p={0}
                        variant="filled"
                        size="sm"
                        radius="sm"
                        color={theme.other.colors.ultraLight}
                        styles={{ label: { fontWeight: 400, fontSize: "14px", color: "black" } }}
                        style={{ opacity: hovered ? 1 : 0.5 }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        Откликнуться
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
});

           
           
