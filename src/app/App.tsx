import {CssBaseline} from "@mui/material";
import {Header} from "@/common/components/Header/Header.tsx";

export function App() {

  return (
      // <ThemeProvider >
          <div>
              <CssBaseline />
              <Header />
              {/*<Routing />*/}
              {/*<ErrorSnackbaar />*/}
          </div>
      // </ThemeProvider>
  )
}