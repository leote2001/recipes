/*eslint-disable*/
"use client"
import React, {useEffect, ReactNode } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Link from 'next/link';
interface LayoutProps {
    children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
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
