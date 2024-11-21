import ym from 'react-yandex-metrika';

export const trackDeleteFromCart = () => {
  if (ym !== undefined) {
    try {
      ym('reachGoal', 'remove-Sellkit');
    } catch (error) {
      console.log(error);
    }
  }
};
