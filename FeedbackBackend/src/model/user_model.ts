import { Document, Schema, model } from 'mongoose';

// User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// User schema
const userSchema = new Schema<IUser>({
  name: { type: String, required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  },
  {versionKey:false , timestamps:false}
);

// User model
const User = model<IUser>('User', userSchema);

export default User