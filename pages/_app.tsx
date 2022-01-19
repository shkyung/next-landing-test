import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "../components/Header";

function MyApp({Component, pageProps}: AppProps) {
    console.error("_app rendering!!")
    return (
        <>
            <Header/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
