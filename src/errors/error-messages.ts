export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_EMAIL_OR_PASSWORD: {
    message: 'Invalid email or password',
    code: 400,
  },
  NO_TOKEN_PROVIDED: {
    message: 'No token provided',
    code: 401,
  },
  INVALID_OR_EXPIRED_TOKEN: {
    message: 'Invalid or expired token',
    code: 401,
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    code: 401,
  },

  // User errors
  EMAIL_ALREADY_EXISTS: {
    message: 'Email already exists',
    code: 400,
  },
  USERNAME_ALREADY_EXISTS: {
    message: 'Username already exists',
    code: 400,
  },
  INVALID_EMAIL_FORMAT: {
    message: 'Invalid email format',
    code: 400,
  },

  // Deck errors
  DECK_NOT_FOUND: {
    message: 'Deck not found',
    code: 404,
  },
  UNAUTHORIZED_DECK_ACCESS: {
    message: 'Unauthorized access to deck',
    code: 400,
  },

  // Card errors
  CARD_NOT_FOUND: {
    message: 'Card not found',
    code: 404,
  },
  UNAUTHORIZED_CARD_ACCESS: {
    message: 'Unauthorized access to card',
    code: 400,
  },
};
