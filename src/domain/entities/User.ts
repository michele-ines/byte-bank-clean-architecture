export interface UserData {
  uuid: string;
  name: string;
  email: string;
  photoURL?: string | null;
  createdAt?: unknown;
}


export interface AuthenticatedUser {
  uid: string;
  email: string | null;
  displayName: string | null;

}