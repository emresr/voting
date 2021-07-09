import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Pricing.module.scss";
import axios from "axios";
const MyVotes = () => {
   const [voters, setVoters] = useState<any>();

   const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/user/1/votings`, {
         headers: { Accept: "application/json" },
      });
      setVoters(response.data);
   };
   useEffect(() => {
      fetchData();
   }, []);
   console.log(voters);
   return (
      <div>
         <Head>
            <title>Pricing | Voting</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <div>
               <h1>My votings</h1>
               <div>
                  {voters &&
                     voters.voters.map((voter) => (
                        <div>
                           <h1>{voter.voting.title}</h1>
                        </div>
                     ))}
               </div>
            </div>
         </Layout>
      </div>
   );
};

export default MyVotes;
