import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {}

export default function Home() {
  const { data: session } = useSession()

  if (session) {
      return (
          <>
              {/* Signed in as {session.user.Username} <br />
              Signed in as {session.user.Type} <br /> */}
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => signOut()}>Sign out</button>
          </>
      )
  }
  return (
      <>
          Not signed in <br />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => signIn()}>Sign in</button>
      </>
  )
}
