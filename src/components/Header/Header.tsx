import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { NavLink, useLocation} from 'react-router-dom';
import HumanIcon from "../../assets/human.svg"
import HumanIconBlack from "../../assets/humanBlack.svg"
import HHIcon from "../../assets/HHunter.png"
//Logo - намеренно в png, svg не хочет билдиться, ни напрямую ни через импорт
export const Header = () => {
    const theme = useMantineTheme();

    const location = useLocation();
    const isCurrent = location.pathname === '/vacancies/moscow';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isCurrent) e.preventDefault();
    };

    const Marker = () => (
        <Box
            style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#4263EB",
            }}
        />
    );

    return (
        <Box    
            component="header"
            data-testid="header"
            style={{
                width: "100%",
                padding: "14px 20px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 2px 22.5px 0px #1C1D1F0D",
            }}
        >
            <Group justify="space-between" align="center" maw={828}>
                <NavLink to="/vacancies/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClick}>
                    <Group align="center" gap="xs">
                        <img src={HHIcon} alt="HH" data-testid="logo-hh"/>
                        <Text fw={600} data-testid="header-title">.FrontEnd</Text>
                    </Group>
                </NavLink>

                <Group gap={24}>
                    <NavLink to="/vacancies/" style={({ isActive }) => ({color: isActive ? theme.other.colors.black1 : theme.other.colors.gray, textDecoration: "none"})} onClick={handleClick}>
                        {({ isActive }) => (
                            <Group align="center" gap={8}>
                                <Text
                                    data-testid="vacancies-text"
                                    fw={500}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    Вакансии FE
                                </Text>
                                {isActive && <Marker />}
                            </Group>
                        )}
                    </NavLink>

                    <NavLink to="/aboutme" style={({ isActive }) => ({color: isActive ? theme.other.colors.black1 : theme.other.colors.gray, textDecoration: "none"})}>
                        {({ isActive }) => (
                            <Group align="center" gap={6} style={{ cursor: "pointer" }}>
                                <img src={isActive ? HumanIconBlack : HumanIcon} alt="human" data-testid="human-icon"/>
                                <Text fw={500} data-testid="about-text">
                                    Обо мне
                                </Text>
                                {isActive && <Marker />}  
                            </Group>
                        )}
                    </NavLink>
                </Group>
            </Group>
        </Box>
    );
};
