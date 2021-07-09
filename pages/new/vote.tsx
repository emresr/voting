import Head from "next/head";
import Layout from "../../components/layout";
import axios from "axios";
import styles from "../../styles/NewVote.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NewVote = () => {
   const router = useRouter();
   const [title, setTitle] = useState<string>("");

   const [answerChild, setAnswerChild] = useState<any>();
   const [answers, setAnswers] = useState<any>([answerChild, answerChild]);
   console.log("answers", answers);

   function addAnswer() {
      setAnswers([...answers, answerChild]);
   }
   const handleChange = (e, index) => {
      answers[index] = e.target.value;
   };
   async function send() {
      try {
         const result: any = await axios.post(
            `http://localhost:4000/addvoting`,
            {
               title,
               answers,
            }
         );
         router.push(`/before/${result.data.id}`);
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
                  value={title}
                  placeholder="Question"
                  className={styles.question}
                  spellCheck="false"
                  onChange={(e) => {
                     setTitle(e.target.value);
                  }}
               />
               {answers.map((answer, index) => (
                  <input
                     key={index}
                     placeholder={`Answer ${index + 1}`}
                     className={styles.question}
                     spellCheck="false"
                     onChange={(e) => {
                        handleChange(e, index);
                     }}
                  />
               ))}

               <button className={styles.add_button} onClick={addAnswer}>
                  Add answer
               </button>
               <button className={styles.add_button} onClick={send}>
                  Send
               </button>
            </div>
         </Layout>
      </div>
   );
};

export default NewVote;
