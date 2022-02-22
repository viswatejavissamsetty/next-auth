import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import "../components/Navbar.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Navbar />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
