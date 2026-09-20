import Image from "next/image";
import type { MenuCategory } from "@/app/_types/product";
import { Icon } from "@/app/_ui/icon";
import styles from "./home-sections.module.css";

interface CategoryCardProps {
  category: MenuCategory;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryCard({ category, selected, onSelect }: CategoryCardProps) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected} aria-controls="explore-menu" className={styles.categoryCard}>
      <Image src={category.image} alt="" fill sizes="(max-width: 1023px) 156px, 150px" className={styles.categoryImage} />
      <span className={styles.categoryShade} />
      <span className={styles.categoryLabel}>
        <span className="text-base font-bold">{category.name}</span>
        <span className={styles.categoryAction}>View dishes <Icon name="arrow" className="size-3" /></span>
      </span>
      {selected && <span className="absolute right-2 top-2 rounded-full bg-primary p-1.5 text-white"><Icon name="check" className="size-3" /></span>}
    </button>
  );
}
