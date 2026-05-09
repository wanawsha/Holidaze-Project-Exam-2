import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout ({ children }) {
    return (
        <>
            <Navbar />
            <main style={{ padding: "20px" }}>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;