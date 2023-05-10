import { Document, Schema, model } from 'mongoose';

// Product interface
interface IProduct extends Document {
  name: string;
  description: string;
  client: Schema.Types.ObjectId;
}

// Product schema
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
});

// Product model
const Product = model<IProduct>('Product', productSchema);

export default Product