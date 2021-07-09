import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Before.module.scss";
import Head from "next/head";
import { Voter } from "../../types/globalTypes";

const Calender = () => {
   const [voters, setVoters] = useState<Array<Voter>>([
      { name: "Monica", point: 0 },
      { name: "Chandler", point: 0 },
      { name: "Ross", point: 0 },
      { name: "Michael", point: 0 },
   ]);
   console.log("voters", voters);
   const [point, setPoint] = useState<number>(100);

   function ArrangeEqually() {
      for (let i: any = 0; i < voters.length; i++) {
         voters[i] = { name: "Chandler", point: 0 };
      }
      console.log(voters);
   }
   useEffect(() => {
      console.log(voters);
   }, [voters]);

   return (
      <div>
         <Head>
            <title>Vote | Planner</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <Layout>
            <div className={styles.before_container}>
               <div className={styles.info_container}>
                  <h1>Arrange your points.</h1>
                  <h1>Remaining point: {point}</h1>
                  <button
                     className={styles.equally}
                     onClick={() => {
                        ArrangeEqually();
                     }}
                  >
                     Arrange equally
                  </button>
               </div>
               <div>
                  {voters.map((voter, index) => (
                     <div className={styles.voter} style={{}}>
                        <h1>{voter.name}</h1>
                        <h1>{voter.point}</h1>
                     </div>
                  ))}
               </div>
            </div>
         </Layout>
      </div>
   );
};

export default Calender;
