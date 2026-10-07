export type Role = 'admin' | 'user';
export interface User { id:string; name:string; email:string; role:Role; status:'active'|'inactive'; department:string; }
export interface RecordItem { id:string; userId:string; type:string; subject:string; status:'Verified'|'Pending'|'Rejected'; score:number; updatedAt:string; }
export interface LoginResponse { token:string; user:User; }
