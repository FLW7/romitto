import styles from '../../ui/styles.module.css';

export const scrollToSection = (section: string | undefined) => {
  if (section !== undefined) {
    const header = document.querySelector(`.${styles.sticky_container}`);

    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const element = document.querySelector(`.section-${section}`);

    if (element) {
      const topOffset = element.getBoundingClientRect().top - headerHeight;

      window.scrollBy({ top: topOffset, behavior: 'smooth' });
    }
  }
};
