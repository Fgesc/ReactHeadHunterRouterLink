import { Route, Navigate, RouterProvider, createRoutesFromElements, createHashRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import { HomePage } from "../../pages/HomePage";
import { AboutMePage } from "../../pages/AboutMePage";
import { VacancyPage } from "../../pages/VacancyPage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { JobList } from "../JobList";
import { vacancyLoader } from "../../loaders/vacancyLoader";

const router = createHashRouter(
    createRoutesFromElements(
        <Route element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/vacancies/moscow" replace />}/>
            <Route path="vacancies" element={<HomePage />}>
                <Route index element={<Navigate to="moscow" replace />} /> 
                <Route path="moscow" element={<JobList />} />
                <Route path="petersburg" element={<JobList />} />
            </Route>
            <Route path="vacancies/:id" element={<VacancyPage />} loader={vacancyLoader}/>
            <Route path="aboutme" element={<AboutMePage />} />
            <Route path="*" element={<NotFoundPage />}/>
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

