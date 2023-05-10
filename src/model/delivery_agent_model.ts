import { Document, Schema, model } from 'mongoose';

interface IDeliveryAgent extends Document {
    email: string;
    password: string;
    client: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    product: Schema.Types.ObjectId;
  }
  
  // Delivery Agent schema
  const deliveryAgentSchema = new Schema<IDeliveryAgent>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  });
  
  // Delivery Agent model
  const DeliveryAgent = model<IDeliveryAgent>('DeliveryAgent', deliveryAgentSchema);

  export default DeliveryAgent