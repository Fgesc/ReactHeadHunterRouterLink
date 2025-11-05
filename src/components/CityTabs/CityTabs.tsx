import { Tabs, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useRedux";
import { setCityFilter } from "../../reducers/JobsSlice";
import { CITIES_FOR_TABS } from "../../constants/constantsMain";

export const CityTabs = () => {
    const theme = useMantineTheme();
    const dispatch = useTypedDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = CITIES_FOR_TABS.find(city => location.pathname.includes(city.value))?.value || "moscow";

    useEffect(() => {
        const city = CITIES_FOR_TABS.find(c => c.value === activeTab);
        if (city) dispatch(setCityFilter(city.filterValue));
    }, [activeTab, dispatch]);

    const handleTabChange = (value: string | null) => {
        if (value) navigate(`/vacancies/${value}`);
    };

    return (
        <Tabs
        value={activeTab}
        onChange={handleTabChange}
        mt={24}
        styles={{
            root: { display: "inline-flex" },
            list: { background: theme.other.colors.background, borderBottom: "none", gap: 0 },
        }}
        >
            <Tabs.List>
                {CITIES_FOR_TABS.map(city => (
                    <Tabs.Tab
                        key={city.value}
                        value={city.value}
                        data-testid={`city-tab-${city.filterValue}`}
                        style={{
                            borderBottom: activeTab === city.value ? `2px solid ${theme.colors.indigo[6]}` : "none",
                            color: theme.other.colors.black1,
                            fontSize: "14px",
                            fontWeight: 400,
                            padding: "10px",
                            borderRadius: 2,
                            background: theme.other.colors.background,
                            cursor: "pointer",
                        }}
                    >
                        {city.label}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    );
};

