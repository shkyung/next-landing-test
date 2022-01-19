import {NextPage} from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";

const News: NextPage = () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>AKV | News</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>News Page</h1>
            </main>
        </div>
    )

}

export default News