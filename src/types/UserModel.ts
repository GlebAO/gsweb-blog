export default interface UserModel {
    id: number,
    name: string,
    email: string,
    role: UserRole,
    createdAt: string,
    status: UserStatus,
    lastLoggedIn: number | null
}

export enum UserStatus {
    ACTIVE = 10,
    INACTIVE = 9,
    DELETED = 0,
}

export enum UserRole {
    ADMIN = "admin",
    USER = "redactor",
    GUEST = "guest",
}

export const userRoles = [
    { val: UserRole.USER, label: "Редактор", classes: "text-warning" },
    { val: UserRole.ADMIN, label: "Администратор", classes: "text-danger" },
    { val: UserRole.GUEST, label: "Гость", classes: "text-success" },
  ];

export const userStatuses = [
    { val: UserStatus.ACTIVE, label: "Активен", classes: "text-success" },
    { val: UserStatus.DELETED, label: "Забанен", classes: "text-danger" },
    { val: UserStatus.INACTIVE, label: "Неактивен", classes: "text-muted" },
]

export interface UserInfoType {
    sub: number | null,
    name: string,
    email: string,
    role: UserRole,
}