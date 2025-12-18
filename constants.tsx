
import { Diamond, Shape, Color, Clarity, Cut, Polish, Symmetry, Fluorescence } from './types';

export const SHAPES: { name: Shape; path: string }[] = [
  { name: 'Round', path: 'M12 2L2 12l10 10 10-10L12 2z' },
  { name: 'Princess', path: 'M4 4h16v16H4V4z' },
  { name: 'Pear', path: 'M12 2s-7 7-7 12 7 8 7 8 7-3 7-8-7-12-7-12z' },
  { name: 'Oval', path: 'M12 2C7.58 2 4 6.48 4 12s3.58 10 8 10 8-4.48 8-10S16.42 2 12 2z' },
  { name: 'Emerald', path: 'M6 4h12l2 4v8l-2 4H6l-2-4V8l2-4z' },
  { name: 'Marquise', path: 'M12 2C12 2 4 12 12 22c0 0 8-10 0-20z' },
  { name: 'Heart', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  { name: 'Radiant', path: 'M6 2h12l4 4v12l-4 4H6l-4-4V6l4-4z' },
  { name: 'Cushion', path: 'M12 2c-5 0-10 2-10 10s5 10 10 10 10-2 10-10-5-10-10-10z' }
];

export const COLORS: Color[] = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
export const CLARITIES: Clarity[] = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];
export const CUTS: Cut[] = ['Ideal', 'Excellent', 'Very Good', 'Good', 'Fair'];
export const SIEVE_SIZES = ['000-00', '00-0', '0-2', '2-6.5', '+6.5', '+11'];

export const MOCK_DIAMONDS: Diamond[] = [
  // Single Diamonds
  {
    id: 'S1001',
    category: 'single',
    shape: 'Round',
    carat: 1.02,
    color: 'D',
    clarity: 'IF',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    depth: 61.5,
    table: 57,
    price: 12500,
    lab: 'GIA',
    image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=800&auto=format&fit=crop',
    seller: 'Blue Nile Global',
    growth: 2.4
  },
  // Lab Grown Single
  {
    id: 'L1001',
    category: 'lab-grown',
    shape: 'Round',
    carat: 1.50,
    color: 'E',
    clarity: 'VVS1',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 3200,
    lab: 'IGI',
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=800&auto=format&fit=crop',
    seller: 'Carbon Gems',
    growth: 5.1
  },
  // Melee Diamonds
  {
    id: 'M5001',
    category: 'melee',
    shape: 'Round',
    carat: 50.00,
    color: 'F',
    clarity: 'VVS2',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 850,
    lab: 'None',
    sieveSize: '0-2',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    seller: 'Surat Diamond Hub',
    growth: 0.5
  },
  // Melee Lab
  {
    id: 'ML5001',
    category: 'melee-lab',
    shape: 'Round',
    carat: 20.00,
    color: 'G',
    clarity: 'VS1',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 420,
    lab: 'None',
    sieveSize: '0-2',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    seller: 'Tech Diamonds Inc',
    growth: 1.2
  },
  // Jewelry
  {
    id: 'J9001',
    category: 'jewelry',
    shape: 'Round',
    carat: 2.4,
    color: 'E',
    clarity: 'VS1',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 45000,
    lab: 'IGI',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    seller: 'Chopard Luxury',
    growth: 4.2
  },
  // Gemstones
  {
    id: 'G8001',
    category: 'gemstones',
    shape: 'Oval',
    carat: 4.5,
    color: 'Mixed',
    clarity: 'VS1',
    cut: 'Excellent',
    polish: 'VG',
    symmetry: 'VG',
    fluorescence: 'None',
    price: 8200,
    lab: 'None',
    image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=800&auto=format&fit=crop',
    seller: 'Sri Lanka Gems',
    growth: -0.8
  },
  // Watches
  {
    id: 'W7001',
    category: 'watches',
    shape: 'Round',
    carat: 0,
    color: 'Mixed',
    clarity: 'IF',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 32500,
    lab: 'None',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    seller: 'Geneva Horology',
    growth: 1.2
  },
  // Bullions
  {
    id: 'B6001',
    category: 'bullions',
    shape: 'Cushion',
    carat: 100, // 100g Bar
    color: 'Mixed',
    clarity: 'IF',
    cut: 'Ideal',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 8400,
    lab: 'None',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800&auto=format&fit=crop',
    seller: 'Perth Mint',
    growth: 0.8
  },
  // Auctions
  {
    id: 'A4001',
    category: 'auctions',
    shape: 'Pear',
    carat: 10.5,
    color: 'D',
    clarity: 'FL',
    cut: 'Excellent',
    polish: 'EX',
    symmetry: 'EX',
    fluorescence: 'None',
    price: 1200000,
    lab: 'GIA',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800&auto=format&fit=crop',
    seller: 'Sotheby\'s Premium',
    growth: 15.4
  }
];
