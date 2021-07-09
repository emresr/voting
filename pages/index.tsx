import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";
import Head from "next/head";
import React, { useState, useEffect } from "react";
const Home = () => {
   return (
      <div>
         <Head>
            <title>Voting</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <div className={styles.home_container}></div>
         </Layout>
      </div>
   );
};

export default Home;
