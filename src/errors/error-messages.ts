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
    code: 404,
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
  USERNAME_EMPTY: {
    message: 'Username cannot be empty',
    code: 400,
  },
  USERNAME_INVALID: {
    message: 'Username must be a string',
    code: 400,
  },
  USERNAME_TOO_SHORT: {
    message: 'Username must be at least 4 characters long',
    code: 400,
  },
  USERNAME_INVALID_CHARS: {
    message: 'Username can only contain letters and numbers',
    code: 400,
  },
  PASSWORD_EMPTY: {
    message: 'Password cannot be empty',
    code: 400,
  },
  PASSWORD_WEAK: {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    code: 400,
  },

  // Deck errors
  DECK_NOT_FOUND: {
    message: 'Deck not found',
    code: 404,
  },
  UNAUTHORIZED_DECK_ACCESS: {
    message: 'Unauthorized access to deck',
    code: 403,
  },
  DECK_NAME_EMPTY: {
    message: 'Name cannot be empty',
    code: 400,
  },
  DECK_NAME_INVALID: {
    message: 'Name must be a string',
    code: 400,
  },
  DECK_COLOR_EMPTY: {
    message: 'Color cannot be empty',
    code: 400,
  },
  DECK_COLOR_INVALID: {
    message: 'Color must be a string',
    code: 400,
  },
  DECK_NAME_ALREADY_EXISTS: {
    message: 'A deck with this name already exists for the user',
    code: 400,
  },

  // Card errors
  CARD_NOT_FOUND: {
    message: 'Card not found',
    code: 404,
  },
  UNAUTHORIZED_CARD_ACCESS: {
    message: 'Unauthorized access to card',
    code: 403,
  },
  CARD_FRONT_EMPTY: {
    message: 'Front cannot be empty',
    code: 400,
  },
  CARD_FRONT_INVALID: {
    message: 'Front must be a string',
    code: 400,
  },
  CARD_BACK_EMPTY: {
    message: 'Back cannot be empty',
    code: 400,
  },
  CARD_BACK_INVALID: {
    message: 'Back must be a string',
    code: 400,
  },
  CARD_DECK_ID_EMPTY: {
    message: 'Deck ID cannot be empty',
    code: 400,
  },
  CARD_TYPE_EMPTY: {
    message: 'Card type cannot be empty',
    code: 400,
  },

  // Nuevos mensajes
  INVALID_TOKEN: {
    message: 'Invalid token',
    code: 401,
  },
  UNAUTHORIZED_ACCESS: {
    message: 'Unauthorized access',
    code: 403,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
    code: 500,
  },

  // Game errors
  INSUFFICIENT_DECK_CARDS: {
    message: 'Deck does not have enough cards (minimum 5)',
    code: 400,
  },
  INVALID_GAME_MODE: {
    message: 'Invalid game mode',
    code: 400,
  },
  INVALID_DIFFICULTY_LEVEL: {
    message: 'Invalid difficulty level',
    code: 400,
  },
  NOT_ENOUGH_CARDS: {
    message: 'Not enough cards to play',
    code: 400,
  },
  CARD_UPDATE_FAILED: {
    message: 'Failed to update card difficulty',
    code: 500,
  },
  INVALID_CARD_DISTRIBUTION: {
    message: 'Invalid card distribution',
    code: 400,
  },
  INVALID_CARD_COUNT: {
    message: 'Invalid card count',
    code: 400,
  },
};
