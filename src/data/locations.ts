export interface LocationGroup {
  region: string;
  areas: string[];
}

export const PROPERTY_LOCATIONS: LocationGroup[] = [
  {
    region: 'Bhara Kahu',
    areas: [
      'Main Bazaar',
      'Prince Road',
      'Simly Dam Road',
      'Shahpur',
      'Kolion',
      'Chattar/Kirpa',
      'Kot Hathial',
      'Jumma Bazar',
      'Janjua Town',
      'Sangalian/Dhok Jillani',
    ],
  },
  {
    region: 'Bani Gala',
    areas: [
      'Main Bani Gala',
      'Pakistan Colony',
      'Mohra Noor',
      'Lakhwal',
      'Malot',
      'Kuri',
      'Jagyot/Nogri/Morya',
      'Pir Sahaba Chowk',
      'Seevra/Pind Bhigwal',
      'Capital Complex Society',
    ],
  },
];

export const PROPERTY_TYPES = [
  'Full House',
  'Upper Portion',
  'Lower Portion',
  'Farmhouse',
  'Plot (construction ke liye)',
] as const;

export const PROPERTY_STAGES = [
  'Khali hai (ready to rent)',
  'Tenant nikal raha hai, jald khali hogi',
  'Abhi kisi aur ko rent pe di hui hai',
  'Construction/finishing ho rahi hai',
] as const;

export const QUICK_SIZES = [
  '5 Marla',
  '7 Marla',
  '10 Marla',
  '1 Kanal',
  '2 Kanal',
];

export const QUICK_FEATURE_TAGS = [
  'Separate Gas Meter',
  'Separate Electric Meter',
  'Car Parking',
  'CCTV Security',
  'Water Bore / Tanker free',
  'Corner Property',
  'Solar System',
  'Servant Quarter',
  'Lawn / Green Area',
];
