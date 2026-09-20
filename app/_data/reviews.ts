export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
}

export const reviewsSummary = {
  score: 4.8,
  totalStars: 5,
  displayCount: "From 2,500+ happy customers",
};

export const customerReviews: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Tanvir Ahmed",
    location: "Dhaka",
    avatar: "/images/reviews/bd-customer-tanvir.png",
    rating: 5,
    comment: "Amazing food! The biryani tastes just like home. Quick delivery and great service!",
  },
  {
    id: "rev-2",
    author: "Nusrat Jahan",
    location: "Chattogram",
    avatar: "/images/reviews/bd-customer-nusrat.png",
    rating: 5,
    comment: "Fresh ingredients, rich flavours and excellent packaging. Everything arrived exactly on time.",
  },
  {
    id: "rev-3",
    author: "Rafiqul Islam",
    location: "Sylhet",
    avatar: "/images/reviews/bd-customer-rafiqul.png",
    rating: 5,
    comment: "Great taste, fast delivery and very friendly staff. The whole family enjoyed the meal.",
  },
  {
    id: "rev-4",
    author: "Arif Hasan",
    location: "Rajshahi",
    avatar: "/images/reviews/bd-customer-arif.png",
    rating: 5,
    comment: "The food arrived warm and neatly packed. The tehari was rich, balanced and worth ordering again.",
  },
  {
    id: "rev-5",
    author: "Sharmin Akter",
    location: "Narayanganj",
    avatar: "/images/reviews/bd-customer-sharmin.png",
    rating: 5,
    comment: "Our family combo had generous portions and everything tasted fresh. Ordering was simple too.",
  },
  {
    id: "rev-6",
    author: "Farzana Rahman",
    location: "Dhaka",
    avatar: "/images/reviews/bd-customer-farzana.png",
    rating: 5,
    comment: "Quick delivery, friendly service and a biryani everyone at the table enjoyed. A dependable favourite.",
  },
];
