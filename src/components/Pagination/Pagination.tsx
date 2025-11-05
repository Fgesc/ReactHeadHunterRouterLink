import { memo } from "react";
import { Pagination as MantinePagination, useMantineTheme } from "@mantine/core";
import LeftIcon from "../../assets/left.svg";
import Left2Icon from "../../assets/left-2.svg";
import RightIcon from "../../assets/right.svg";
import Right2Icon from "../../assets/right-2.svg";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = memo(({ page, totalPages, onPageChange }: PaginationProps) => {
    const theme = useMantineTheme();
    const FirstIcon = () => <img src={Left2Icon} alt="В начало" />;
    const PrevIcon = () => <img src={LeftIcon} alt="Предыдущая страница" />;
    const NextIcon = () => <img src={RightIcon} alt="Следующая страница" />;
    const LastIcon = () => <img src={Right2Icon} alt="В конец" />;

    return (
        <MantinePagination
            data-testid="pagination"
            total={totalPages}
            value={page + 1}
            onChange={(p) => onPageChange(p - 1)}
            boundaries={1}
            siblings={1}
            withControls
            withEdges
            getItemProps={(activePage) => ({
                style: {
                border: `1px solid ${theme.other.colors.preLight}`,
                borderRadius: "1px",
                backgroundColor:
                    activePage === page + 1
                    ? theme.colors.indigo[9]
                    : theme.other.colors.background,
                color:
                    activePage === page + 1
                    ? theme.white
                    : theme.other.colors.black1,
                fontWeight: 500,
                fontSize: "16px",
                width: "34px",
                height: "32px",
                padding: 0,
                },
            })}
            styles={{
                control: {
                border: `1px solid ${theme.other.colors.preLight}`,
                borderRadius: "1px",
                width: 34,
                height: 32,
                padding: 0,
                backgroundColor: theme.other.colors.background,
                "&[dataDisabled]": {
                    opacity: 0.3,
                    cursor: "not-allowed",
                },
                },
                dots: {
                color: theme.other.colors.gray,
                fontWeight: 500,
                fontSize: "16px",
                },
            }}
            nextIcon={NextIcon}
            previousIcon={PrevIcon}
            firstIcon={FirstIcon}
            lastIcon={LastIcon}
            mt={24}
            gap={8}
        />
    );
});
