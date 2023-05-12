import { Document, Schema, model } from 'mongoose';

// Product interface
interface IProduct extends Document {
  name: string;
  description: string;
  client_id: Schema.Types.ObjectId;
}

// Product schema
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
});

// Product model
const Product = model<IProduct>('Product', productSchema);

export default Product