// pages/_app.js
import { SearchProvider } from "@/app/context/searchcontext";

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>  {/* Ensure this wraps everything */}
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
