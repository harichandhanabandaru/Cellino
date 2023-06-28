/**
 * Joins `firstName` and `lastName` to return in a specific format.
 *
 *
 * Format : {firstName} {lastName}
 *
 * @example
 * Peter Parker (firstName: "Peter", lastName: "Parker")
 */
export function formatName(
  firstName?: string | null,
  lastName?: string | null
) {
  let firstNameFormatted = "";
  if (firstName) {
    firstNameFormatted = firstName.trim();
    if (firstNameFormatted) {
      firstNameFormatted =
        firstNameFormatted.charAt(0).toUpperCase() +
        firstNameFormatted.slice(1);
    }
  }

  let lastNameFormatted = "";
  if (lastName) {
    lastNameFormatted = lastName.trim();
    if (lastNameFormatted) {
      lastNameFormatted =
        lastNameFormatted.charAt(0).toUpperCase() + lastNameFormatted.slice(1);
    }
  }

  if (firstNameFormatted || lastNameFormatted) {
    return `${firstNameFormatted} ${lastNameFormatted}`;
  }

  return "-";
}

/**
 * Returns the initials of the `firstName` and `lastName` as string.
 *
 * @example PP - Peter Parker
 */
export function getInitials(firstName: string, lastName?: string) {
  return (
    firstName.charAt(0).toUpperCase() +
    (lastName && lastName?.charAt(0).toUpperCase())
  );
}

export const capitalizeText = (text: string) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return "-";
};
