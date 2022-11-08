import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Map from '../components/map'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Leaflet todo</title>
        <meta name="description" content="React leaflet todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Map />
      </main>
    </div>
  )
}
