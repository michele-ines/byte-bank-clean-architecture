export const getAuth = jest.fn(() => ({
  currentUser: null,
  onAuthStateChanged: jest.fn(),
}));

export const initializeAuth = jest.fn(() => ({
  currentUser: null,
  onAuthStateChanged: jest.fn(),
}));

export const getReactNativePersistence = jest.fn(() => 'mock-persistence');

export const signInWithEmailAndPassword = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const sendPasswordResetEmail = jest.fn();
export const signOut = jest.fn();
export const onAuthStateChanged = jest.fn();
export const updateProfile = jest.fn();
export const updateEmail = jest.fn();
export const updatePassword = jest.fn();
export const reauthenticateWithCredential = jest.fn();
export const EmailAuthProvider = {
  credential: jest.fn(),
};
