import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserProps extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword: (password: string) => Promise<Boolean>;
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

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model('User', userSchema);
