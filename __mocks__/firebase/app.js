export class FirebaseError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'FirebaseError';
  }
}

export const initializeApp = jest.fn(() => ({
  name: '[DEFAULT]',
  options: {},
}));

export const getApp = jest.fn(() => ({
  name: '[DEFAULT]',
  options: {},
}));

export const getApps = jest.fn(() => []);

export const deleteApp = jest.fn();
