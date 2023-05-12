import { Document, Schema, model } from 'mongoose';

interface IDeliveryAgent extends Document {
    email: string;
    password: string;
    client_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
  }
  
  // Delivery Agent schema
  const deliveryAgentSchema = new Schema<IDeliveryAgent>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  });
  
  // Delivery Agent model
  const DeliveryAgent = model<IDeliveryAgent>('DeliveryAgent', deliveryAgentSchema);

  export default DeliveryAgent