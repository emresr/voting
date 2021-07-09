import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Pricing.module.scss";

const Pricing = () => {
   return (
      <div>
         <Head>
            <title>Pricing | Voting</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <div className={styles.container}>
               <h1>Choose best option for you.</h1>

               <div className={styles.offers_container}>
                  <div className={styles.offer}>
                     <h1>Free for limited time.</h1>
                  </div>
                  <div className={`${styles.offer} ${`styles.deactivated`}`}>
                     <h1>Up to 3 organizations</h1>
                     <h1>Starter Pack</h1>
                     <h1>$5,4</h1>
                  </div>
                  <div className={styles.offer}>
                     <h1>Up to 3 organizations</h1>
                     <h1>Pro Pack</h1>
                     <h1>$10</h1>
                  </div>
               </div>
            </div>
         </Layout>
      </div>
   );
};

export default Pricing;
