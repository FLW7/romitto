import { z } from 'zod';

export const baseFormSchema = z.object({
  address: z.string().min(1, {
    message: 'Введите адресс',
  }),
  isPrivateHouse: z.boolean().default(false),
  floor: z.string(),
  entreance: z.string(),
  houseNumber: z.string(),
  doorNumber: z.string().optional(),
  apt: z.string(),
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
