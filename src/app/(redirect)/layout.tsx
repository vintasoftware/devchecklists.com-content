import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <html>{children}</html>;
}
