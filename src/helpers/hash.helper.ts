import { createHash } from 'crypto';

export function createSHA256Hash(data: string): string {
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}
