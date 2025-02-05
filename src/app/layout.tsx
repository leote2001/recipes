/*eslint-disable*/
import { Metadata } from "next";
import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}
export const metadata: Metadata = {
    title: "Recipes",
    description: "Recipes from all over the world",
    openGraph: {
        title: "Recipes",
        description: "Recipes from all over the world"
    }
} 
export default function Layout({ children }: LayoutProps) {
    return (
        <html lang='en'>
            <body>
                <div className="container text-center">
                    <header className='text-center'>
                        <h1><Link href="/">Recipes</Link></h1>
                    </header>
                    <main className='text-center'>
                        {children}
                    </main>
                    <footer className='text-center'>
                        <p className='text-muted'>Copyright &copy;2025</p>
                    </footer>
                </div>
            </body>
        </html>
    );
}
