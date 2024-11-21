import ym from 'react-yandex-metrika';

export const trackPurchase = () => {
  if (ym !== undefined) {
    try {
      ym('reachGoal', 'purchase-Sellkit');
    } catch (error) {
      console.log(error);
    }
  }
};
