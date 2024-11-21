import { z } from 'zod';

export const baseFormSchema = z.object({
  address: z.string().min(1, {
    message: 'Введите адресс',
  }),
  isPrivateHouse: z.boolean().default(false),
  addressFullData: z.string().optional(),
  floor: z.string().min(1, { message: 'Необходимо заполнить все поля' }),
  entreance: z.string().min(1, { message: 'Необходимо заполнить все поля' }),
  houseNumber: z.string(),
  doorNumber: z.string().optional(),
  apt: z.string().min(1, { message: 'Необходимо заполнить все поля' }),
  country: z.string(),
  commentory: z.string().optional(),
  city: z.string(),
  street: z.string(),
  lattitude: z.number(),
  longitude: z.number(),
  polygonID: z.number(),
  organisationID: z.number(),
});

export const baseFormPrivateHouseSchema = z.object({
  address: z.string().min(1, {
    message: 'Введите адресс',
  }),
  isPrivateHouse: z.boolean().default(false),
  addressFullData: z.string().optional(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  lattitude: z.number(),
  longitude: z.number(),
  polygonID: z.number(),
  organisationID: z.number(),
  floor: z.string().optional(),
  entreance: z.string().optional(),
  houseNumber: z.string(),
  doorNumber: z.string().optional(),
  apt: z.string().optional(),
  commentory: z.string().optional(),
});

export type FormType = z.infer<typeof baseFormSchema>;
