/**
 * Mock Service to communicate with Eventor API
 */
/**
 * Service to communicate with Eventor API
 */
export const registerUserInEventor = async (userData) => {
  const EVENTOR_API_URL = process.env.EVENTOR_API_URL || 'http://example.com';
  const EVENTOR_API_KEY = process.env.EVENTOR_API_KEY;

  console.log('Registering user in Eventor:', userData);

  try {
    const response = await fetch(`${EVENTOR_API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': EVENTOR_API_KEY,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Eventor API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('Failed to register in Eventor:', error);
    // Return success: false but don't crash the main flow if not critical,
    // or rethrow if we want to block. For now, we log and return false.
    return {
      success: false,
      error: error.message,
    };
  }
};
