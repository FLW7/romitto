import { z } from 'zod';

export const placingOrderFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Введите Имя',
  }),
  phone: z.string().regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/),
  mail: z.string().email(),
  pay: z.string().min(2, {
    message: 'Выберите способ оплаты',
  }),
  moneyChange: z.string().optional(),
  comment: z.string().optional(),
  dontCall: z.boolean().default(false).optional(),
  date: z.object({ date: z.string(), time: z.string() }),
});

export type FormType = z.infer<typeof placingOrderFormSchema>;
