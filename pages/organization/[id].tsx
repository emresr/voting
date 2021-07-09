import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout";
import styles from "../../styles/Organization.module.scss";
import Head from "next/head";
import Router from "next/router";

const Organization = () => {
   const [organization, setOrganization] = useState<any>();
   const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/org/1`, {
         headers: { Accept: "application/json" },
      });
      setOrganization(response.data);
   };

   useEffect(() => {
      fetchData();
   }, []);
   useEffect(() => {}, [organization]);
   console.log(organization);

   return (
      <div>
         {organization && (
            <div>
               <Head>
                  <title>{organization.name} | Voting</title>
                  <link rel="icon" href="/favicon.ico" />
               </Head>

               <Layout>
                  <div className={styles.org_container}>
                     <div className={styles.left_container}>
                        <h1>{organization.name}</h1>

                        <div className={styles.users_container}>
                           <h1>Users</h1>
                           {organization.users &&
                              organization.users.map((user) => (
                                 <div>
                                    <h1>{user.name}</h1>
                                 </div>
                              ))}
                        </div>
                     </div>
                     <div className={styles.votings_container}>
                        <h1>Votings</h1>
                        {organization.votings &&
                           organization.votings.map((voting) => (
                              <div>
                                 <h1>{voting.title}</h1>
                              </div>
                           ))}
                     </div>
                  </div>
               </Layout>
            </div>
         )}
      </div>
   );
};
export default Organization;
