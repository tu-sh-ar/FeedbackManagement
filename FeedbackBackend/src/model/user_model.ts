import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// User interface
interface IUser extends Document {
  _id:string
  name: string;
  email: string;
  password: string;
}

// User schema
const userSchema = new Schema<IUser>({
  _id:{ type:String, default:uuidv4},
  name: { type: String, required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  },
  {versionKey:false , timestamps:false}
);

// User model
const User = model<IUser>('User', userSchema);

export default User