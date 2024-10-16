export function saveAuthData(token: string) {
  try {
    if (typeof token === 'string') {
      localStorage.setItem('authToken', token); // Store the token directly
    } else {
      console.warn('Invalid data format for saving auth data. Expected a string.');
    }
  } catch (error) {
    console.error('Error saving authentication data:', error);
    return error;
  }
}

export function getAuthData(): string | null {
  try {
    return localStorage.getItem('authToken'); // Retrieve the token directly
  } catch (error) {
    console.error('Error retrieving authentication data:', error);
    return null;
  }
}

export function clearAuthData() {
  try {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
  } catch (error) {
    console.error('Error clearing authentication data:', error);
  }
}
