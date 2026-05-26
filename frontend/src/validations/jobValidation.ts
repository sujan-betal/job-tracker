export const validateJobForm = (company: string, role: string) => {
  const errors: Record<string, string> = {};
  if (!company.trim()) errors.company = "Company name required";
  if (!role.trim())    errors.role    = "Role is required";
  return errors;
};
