export type OwnerVerificationStatus = 'owner' | 'agent' | 'tenant' | null;

export type PropertyStage =
  | 'Khali hai (ready to rent)'
  | 'Tenant nikal raha hai, jald khali hogi'
  | 'Abhi kisi aur ko rent pe di hui hai'
  | 'Construction/finishing ho rahi hai'
  | '';

export type PropertyType =
  | 'Full House'
  | 'Upper Portion'
  | 'Lower Portion'
  | 'Farmhouse'
  | 'Plot (construction ke liye)'
  | '';

export interface UploadedPhoto {
  id: string;
  name: string;
  url: string;
  size: number;
}

export interface OwnerFormData {
  // Verification
  isOwner: OwnerVerificationStatus;
  // Q1
  stage: PropertyStage;
  // Q2
  fullName: string;
  // Q3
  phone: string;
  // Q4
  location: string;
  customLocation?: string;
  // Q5
  propertyType: PropertyType;
  // Q6
  size: string;
  // Q7
  expectedRent: string;
  // Q8
  additionalDetails: string;
  // Q9
  photos: UploadedPhoto[];
}
