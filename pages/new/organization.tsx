import Head from "next/head";
import Layout from "../../components/layout";
import axios from "axios";
import styles from "../../styles/NewVote.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NewVote = () => {
   const router = useRouter();
   const [name, setName] = useState<string>("");

   async function create() {
      try {
         const result: any = await axios.post(`http://localhost:4000/addorg`, {
            name,
         });
         router.push(`/organization/${result.data.id}`);
      } catch (err) {
         console.error(err);
      }
   }
   return (
      <div>
         <Head>
            <title>New Vote | Voting</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <div className={styles.container}>
               <input
                  value={name}
                  placeholder="Organization Name"
                  className={styles.question}
                  spellCheck="false"
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />

               <button className={styles.add_button} onClick={create}>
                  Create
               </button>
            </div>
         </Layout>
      </div>
   );
};

export default NewVote;
