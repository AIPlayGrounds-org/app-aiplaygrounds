export const contactFields = [
  'inquiryType',
  'name',
  'organization',
  'email',
  'message',
] as const;

export type ContactField = (typeof contactFields)[number];
export const contactLimits = {
  name: 200,
  organization: 200,
  email: 254,
  message: 8000,
};
export const contactAction = 'contact';
export const contactEmailPattern =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)*$/i;
