import { Document, Schema, model } from 'mongoose';

interface IClient extends Document {
    email: string;
    password: string;
  }
  
  // Client schema
  const clientSchema = new Schema<IClient>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    },
    {versionKey:false , timestamps:false}
  );
  
  // Client model
  const Client = model<IClient>('Client', clientSchema);
  
  export default Client