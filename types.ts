export type InventoryCategory = 'single' | 'melee' | 'lab-grown' | 'melee-lab' | 'fancy-color' | 'fancy-lab' | 'jewelry' | 'gemstones' | 'watches' | 'bullions' | 'auctions';
export type Shape = 'Round' | 'Princess' | 'Pear' | 'Oval' | 'Emerald' | 'Marquise' | 'Heart' | 'Radiant' | 'Cushion';
export type Clarity = 'FL' | 'IF' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'SI2' | 'I1';
export type Color = 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'Mixed';
export type Cut = 'Ideal' | 'Excellent' | 'Very Good' | 'Good' | 'Fair';
export type Polish = 'EX' | 'VG' | 'GD' | 'FR';
export type Symmetry = 'EX' | 'VG' | 'GD' | 'FR';
export type Fluorescence = 'None' | 'Faint' | 'Medium' | 'Strong' | 'Very Strong';

export interface Diamond {
  id: string;
  category: InventoryCategory;
  shape: Shape;
  carat: number; // For Melee, this is total parcel weight
  color: Color;
  clarity: Clarity;
  cut: Cut;
  polish: Polish;
  symmetry: Symmetry;
  fluorescence: Fluorescence;
  depth?: number;
  table?: number;
  price: number; // Price per carat for Melee, Total for Single
  lab: 'GIA' | 'IGI' | 'HRD' | 'None';
  image: string;
  seller: string;
  growth: number;
  // Melee specific
  sieveSize?: string;
  quantity?: number;
}

export interface MarketTrend {
  date: string;
  price: number;
}