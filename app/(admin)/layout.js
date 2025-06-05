
import FooterDashboard from "./components/footer";
import SideBarDashboard from "./components/sidebar";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import "@/app/styles/globals.css";

export default function PageLayout({ children }) {
    return (
        <>
            <Navbar />
            <SideBarDashboard />
            {children}
            <FooterDashboard />
        </>
    );
}