/**
 * Calculate the Levenshtein distance between two strings
 * This is used for fuzzy matching to detect similar issue titles
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns The Levenshtein distance (number of edits needed to transform a into b)
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculate similarity ratio between two strings (0-1)
 * 1.0 means identical, 0.0 means completely different
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns Similarity ratio between 0 and 1
 */
export function similarityRatio(a: string, b: string): number {
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
  const maxLength = Math.max(a.length, b.length);

  if (maxLength === 0) return 1.0;

  return 1 - distance / maxLength;
}
