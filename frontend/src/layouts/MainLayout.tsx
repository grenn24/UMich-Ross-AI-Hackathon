import TopNav from "../components/navigation/TopNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <TopNav />
            <main className="app-main">
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
