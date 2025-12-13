export const USER_ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  REGULAR_USER: "regular_user",
};

export const USER_ROLE_OPTIONS = Object.values(USER_ROLES);

export const USER_ACCOUNT_STATUS = {
  ACTIVE: "active",
  BANNED: "banned",
  SUSPENDED: "suspended",
  PENDING_VERIFICATION: "pending_verification",
};

export const USER_ACCOUNT_STATUS_OPTIONS = Object.values(USER_ACCOUNT_STATUS);
