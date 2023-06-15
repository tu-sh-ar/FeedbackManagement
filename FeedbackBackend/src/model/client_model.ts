import { Document, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IClient extends Document {
    _id:string;
    email: string;
    password: string;
  }
  
  // Client schema
  const clientSchema = new Schema<IClient>({
    _id:{ type:String, default:uuidv4},
    email: { type: String, required: true },
    password: { type: String, required: true },
    },
    {versionKey:false , timestamps:false}
  );
  
  // Client model
  const Client = model<IClient>('Client', clientSchema);
  
  export default Client