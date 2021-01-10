import mongoose from 'mongoose';
import { Password } from '../helpers/Password';

interface UserAttr {
  username: string;
  nick: string;
  password: string;
  email: string;
  avatar: string;
}

interface UserDoc extends UserAttr, mongoose.Document {
  isAdmin: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttr): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    nick: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // Delete sensitive data
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
