import { Document, Schema, model } from 'mongoose';

// User interface
interface IUser extends Document {
  email: string;
  password: string;
}

// User schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// User model
const User = model<IUser>('User', userSchema);

export default User