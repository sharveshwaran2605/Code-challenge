export type Role = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string; name: string; email: string; password: string; role: Role;
  status: UserStatus; department: string;
}
export interface RecordItem {
  id: string; userId: string; type: string; subject: string;
  status: 'Verified' | 'Pending' | 'Rejected'; score: number; updatedAt: string;
}
