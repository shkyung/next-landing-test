import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "../components/Header";
import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/Canvas'),
    { ssr: false }
)

function MyApp({Component, pageProps}: AppProps) {
    console.error("_app rendering!!")
    return (
        <>
            <Header/>
            <Component {...pageProps} />
            <DynamicComponentWithNoSSR/>
        </>
    )
}

export default MyApp
