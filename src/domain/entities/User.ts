import { UserProfile } from "./UserProfile";

export class User {
  public id: number;
  public name: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public profile: UserProfile;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(
    id: number,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    profile: UserProfile,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.profile = profile;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
