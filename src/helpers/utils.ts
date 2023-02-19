/**
 * Utilities to remove keys with value is undefined, null or empty
 * Useful for clearing parameter objects, to not display empty parameters in the url
 */
export const cleanObject = (object?: Record<string, any>) => {
  if (!object) return {};
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (value === undefined || value === null || value === '') {
      delete object[key];
    }
  });
  return object;
};

export const formatUpperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/*
 * Ignore operators that handled by imperva for sql injection
 */
export const sanitizeUserSearchText = (search: string) => {
  const value = search.trim();

  // 1. single quote: if only one and it's at the last place, Imperva consider it's sql injection
  if (value.split("'").length === 2 && value.substring(value.length - 1) === "'") {
    return search.replace("'", '');
  }
  return search;
};
