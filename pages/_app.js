import { ProductsContextProvier } from '@/components/ProductsContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ProductsContextProvier>
      <Component {...pageProps} />
    </ProductsContextProvier>
  )
  return <Component {...pageProps} />
}
