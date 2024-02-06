export const cleanQueryFromEmptyValues = (query: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(query).filter(([key, value]) => value !== "")
  );
