import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Voting.module.scss";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
const Calender = () => {
   const [voting, setVoting] = useState<any>();
   const router = useRouter();
   const { id } = router.query;
   console.log("id", `lmao ${typeof id}`);

   const fetchData = async (id) => {
      const response = await axios.get(`http://localhost:4000/voting/${id}`, {
         headers: { Accept: "application/json" },
      });
      console.log("res", response.data);
      setVoting(response.data);
   };

   useEffect(() => {
      fetchData(4);
   }, []);

   return (
      <div>
         <Head>
            <title>Vote | Planner</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <Layout>
            {voting && (
               <div className={styles.vote_container}>
                  <h1>{voting.title}</h1>
                  <div>
                     {voting &&
                        voting.answers &&
                        voting.answers.map((answer) => (
                           <div>
                              <button className={styles.answer}>
                                 <h1>{answer.title}</h1>
                              </button>
                           </div>
                        ))}
                  </div>
               </div>
            )}
         </Layout>
      </div>
   );
};

export default Calender;
