import type { NextConfig } from 'next'
///(https:///bd0b320e-7ff9-45b7-9455-f6d739c8dd89-bh.jpg)
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
} 
;

 
export default config