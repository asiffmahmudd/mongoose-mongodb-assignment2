import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
    message: 'First name must be in capitalize format',
  }),
  lastName: z.string().min(1).max(20).refine(value => /^[A-Za-z]+$/.test(value), {
    message: 'Last name must contain only letters',
  }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const userValidationSchema = z.object({
    userId: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(1),
    fullName: fullNameValidationSchema,
    age: z.number().min(1),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: addressValidationSchema
});

export default userValidationSchema;