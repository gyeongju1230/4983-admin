import GlobalStyles from "@/styles/globalStyles";
import { TopBar } from "@/components/common/top-bar/TopBar";
import { SideTab } from "@/components/common/side-tab/SideTab";
import { MainContent } from "@/components/common/main-content/MainContent";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <TopBar />
      <div style={{ display: "flex", gap: "1.1rem" }}>
        <SideTab />
        <MainContent>
          <Component {...pageProps} />
        </MainContent>
      </div>
    </>
  );
}
