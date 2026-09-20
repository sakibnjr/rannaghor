export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconType: "leaf" | "chef" | "delivery" | "phone";
}

export const whyChooseUsData: BenefitItem[] = [
  {
    id: "benefit-fresh",
    title: "Fresh Ingredients",
    description: "Locally sourced, always fresh.",
    iconType: "leaf",
  },
  {
    id: "benefit-cooking",
    title: "Quality Cooking",
    description: "Authentic taste, expert chefs.",
    iconType: "chef",
  },
  {
    id: "benefit-delivery",
    title: "Fast Delivery",
    description: "Hot & fresh, on time.",
    iconType: "delivery",
  },
  {
    id: "benefit-ordering",
    title: "Easy Ordering",
    description: "Simple, secure & convenient.",
    iconType: "phone",
  },
];
