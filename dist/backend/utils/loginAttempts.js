const loginAttempts = {};
export function getLoginAttempt(nis) {
    return loginAttempts[nis] || null;
}
export function updateLoginAttempt(nis, attemptCount, blockUntil) {
    loginAttempts[nis] = { attemptCount, lastAttempt: new Date(), blockUntil };
}
