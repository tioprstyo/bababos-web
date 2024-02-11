export interface RatingProps {
  rate: number;
  count: number;
}

export interface ProductProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingProps;
  title: string;
}