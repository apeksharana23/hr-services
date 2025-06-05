
import FooterDashboard from "./components/footer";
import SideBar from "./components/sidebardashboard";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import "@/app/styles/globals.css";

export default function PageLayout({ children }) {
    return (
        <>
            <Navbar />
            <SideBar />
            {children}
            <FooterDashboard />
        </>
    );
}