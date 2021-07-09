import styles from "../styles/Layout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const Layout = ({ children }: any) => {
   const router = useRouter();
   const path: string = useRouter().pathname;

   const [isMeOpen, setIsMeOpen] = useState<Boolean>(false);

   return (
      <main className={styles.main}>
         <header className={styles.header}>
            <h1 className={styles.header_title}>
               <Link href="/">Voting</Link>
            </h1>
            <div className={styles.links}>
               <div className={styles.link}>
                  <Link href="/new/vote">
                     <a>New Vote</a>
                  </Link>
               </div>
               <div className={styles.link}>
                  <Link href="/pricing">
                     <a>Pricing</a>
                  </Link>
               </div>
               <div className={styles.link}>
                  <Link href="/myvotes">
                     <a>My Votes</a>
                  </Link>
               </div>

               <div className={styles.link}>
                  <label onClick={() => setIsMeOpen(!isMeOpen)}>Me</label>
               </div>
            </div>{" "}
         </header>

         <div>{children}</div>
      </main>
   );
};

export default Layout;
