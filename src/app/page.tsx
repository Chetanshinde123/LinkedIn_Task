// pages/index.tsx
import Link from 'next/link';
import './globals.css';
import ProductsPage from './products/page';

export default function Home() {
  return (
    <>
      <ProductsPage />
    </>
  );
}
