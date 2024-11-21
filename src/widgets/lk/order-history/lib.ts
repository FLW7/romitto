export const Status = {
  IN_PROGRESS: 'В работе',
  IN_PROGRESS2: 'Новый',
  PAYMENT_ERROR: 'Ошибка оплаты',
  COMPLETED: 'Завершен',
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case Status.IN_PROGRESS:
    case Status.IN_PROGRESS2: {
      return 'text-success';
    }
    case Status.PAYMENT_ERROR: {
      return 'text-main';
    }

    default:
  }
};
