import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { store, wrapper } from '../redux/store'
import { Provider, useSelector } from 'react-redux'
import { globalModalSelector } from '../redux/slices/globalModalSlice'
import { globalToastSelector } from '../redux/slices/globalToastSlice'

import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import GlobalLoading from '../components/global/GlobalLoading'
import GlobalModal from '../components/global/GlobalModal'
import GlobalToast from '../components/global/GlobalToast'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  const currentUrl = router.pathname

  const { isModalOpen } = useSelector(globalModalSelector)
  const { isToastOpen } = useSelector(globalToastSelector)

  if (currentUrl.includes('auth/login')) {
    return <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  }
  return <SessionProvider session={session}>
    <Provider store={store}>
      {isToastOpen && <GlobalToast />}
      {isModalOpen && <GlobalModal />}
      <GlobalLoading size={60} />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Topbar />
      </div>
      <div>
        <Sidebar />
      </div>
      <div className="px-6 2xl:container ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Component {...pageProps} />
      </div>
    </Provider>
  </SessionProvider>
}
export default wrapper.withRedux(App);