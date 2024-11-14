import { PropsWithChildren, ReactNode } from "react";
import { Container, CssBaseline } from "@mui/material";

interface LayoutProps extends PropsWithChildren {
  header?: ReactNode
}
export const Layout = ({ header, children }: LayoutProps) => (
  <>
    <CssBaseline />
    {header}
    <Container>
      {children}
    </Container>
  </>
);
