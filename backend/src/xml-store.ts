import fs from 'fs/promises';
import path from 'path';
import { Builder, parseStringPromise } from 'xml2js';
import { RecordItem, User } from './types';

const DB_PATH = path.join(process.cwd(), 'data', 'database.xml');

async function readDb(): Promise<any> {
  const xml = await fs.readFile(DB_PATH, 'utf8');
  return parseStringPromise(xml, { explicitArray: false });
}

async function writeDb(db: any): Promise<void> {
  const builder = new Builder({ renderOpts: { pretty: true, indent: '  ', newline: '\n' } });
  await fs.writeFile(DB_PATH, builder.buildObject(db), 'utf8');
}

const arr = <T>(value: T | T[] | undefined): T[] => !value ? [] : Array.isArray(value) ? value : [value];

export async function getUsers(): Promise<User[]> {
  const db = await readDb();
  return arr(db.database.users?.user).map((u: any) => ({ ...u, role: u.role as any, status: u.status as any }));
}
export async function getRecords(): Promise<RecordItem[]> {
  const db = await readDb();
  return arr(db.database.records?.record).map((r: any) => ({ ...r, score: Number(r.score) }));
}
export async function saveUsers(users: User[]): Promise<void> {
  const db = await readDb();
  db.database.users = { user: users };
  await writeDb(db);
}
export async function findUser(login: string, password: string, role: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => (u.id === login || u.email.toLowerCase() === login.toLowerCase()) && u.password === password && u.role === role && u.status === 'active');
}
