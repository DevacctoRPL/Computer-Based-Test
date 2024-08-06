interface LoginAttempt {
  attemptCount: number;
  lastAttempt: Date | null;
  blockUntil: Date | null;
}

const loginAttempts: Record<number, LoginAttempt> = {};

export function getLoginAttempt(nis: number): LoginAttempt | null {
  return loginAttempts[nis] || null;
}

export function updateLoginAttempt(
    nis: number,
    attemptCount: number,
    blockUntil: Date | null,
): void {
  loginAttempts[nis] = {attemptCount, lastAttempt: new Date(), blockUntil};
}
