import GlobalStyles from "@/styles/globalStyles";
import { TopBar } from "@/components/common/top-bar/TopBar";
import { SideTab } from "@/components/common/side-tab/SideTab";
import { MainContent } from "@/components/common/main-content/MainContent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <TopBar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: "flex", gap: "1.1rem" }}>
          <SideTab />
          <MainContent>
            <Component {...pageProps} />
          </MainContent>
        </div>
      </LocalizationProvider>
    </>
  );
}
