import { Icon } from "@/app/_ui/icon";
import styles from "./brand-signature.module.css";

type BrandSignatureProps =
  | { variant: "stamp"; text: string }
  | { variant: "footer"; firstLine: string; secondLine: string };

export function BrandSignature(props: BrandSignatureProps) {
  if (props.variant === "stamp") {
    const [first = "Taste", middle = "the", ...last] = props.text.split(" ");

    return (
      <div role="img" aria-label={props.text} className={`${styles.handwritten} ${styles.stamp}`}>
        <span className={styles.stampMain}>{first}</span>
        <span className={styles.stampSmall}>{middle}</span>
        <span className={styles.stampMain}>{last.join(" ")}</span>
      </div>
    );
  }

  return (
    <div role="img" aria-label={`${props.firstLine}. ${props.secondLine}.`} className={`${styles.handwritten} ${styles.footerSignature}`}>
      <span className={styles.footerLine}>{props.firstLine}</span>
      <span className={styles.footerLine}>{props.secondLine}</span>
      <Icon name="heart" className={`${styles.heart} size-5`} />
      <span aria-hidden="true" className={styles.leaf} />
    </div>
  );
}
