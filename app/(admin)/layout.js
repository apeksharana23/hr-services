
import FooterDashboard from "./components/footer";
import SideBarDashboard from "./components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import "@/app/styles/globals.css";



export default function PageLayout({ children }) {
    return (
        <div>

            <SideBarDashboard /> {/* Add the Sidebar component */}
            {children} {/* Render the page content */}
            <FooterDashboard /> {/* Add the Footer component */}
        </div>
    );
}