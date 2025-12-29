export const getStorage = jest.fn(() => ({
  ref: jest.fn(),
}));

export const ref = jest.fn();
export const uploadBytes = jest.fn();
export const uploadString = jest.fn();
export const getDownloadURL = jest.fn(() => Promise.resolve('mock-download-url'));
export const deleteObject = jest.fn();
export const listAll = jest.fn();
export const getMetadata = jest.fn();
export const updateMetadata = jest.fn();
