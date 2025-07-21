export class UserProfile {
  public id: number;
  public userId: number;
  public password: string;
  public isVerified: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(
    id: number,
    userId: number,
    password: string,
    isVerified: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.password = password;
    this.isVerified = isVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
