 'use client'
 import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./_navbar/page";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Provider } from "react-redux";
import { store } from "./_redux/store";



const roboto = Roboto({ 
  subsets : ['latin'] ,
  weight : ['400' , '700']

})


export default function RootLayout(  
  {children }: {children : ReactNode
  }
){
 

  return (
    <html lang="en">
      <body style={{fontFamily: roboto.style.fontFamily}}>
        <AppRouterCacheProvider> 
          <Provider store={store}> 

            <Navbar/>
        {children}

          </Provider>



        </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
