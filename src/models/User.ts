import { model, Schema, Document } from 'mongoose';

export interface UserProps extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<UserProps>({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('User', userSchema);
