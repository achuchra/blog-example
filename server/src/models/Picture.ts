import mongoose, { PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const pictureSchema = new mongoose.Schema(
  {
    author: mongoose.Schema.Types.ObjectId,
    title: String,
    original: {
      path: String,
      resolutions: {
        width: Number,
        height: Number,
      },
    },
    icon: {
      path: String,
      resolutions: {
        width: Number,
        height: Number,
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

pictureSchema.plugin(paginate);

pictureSchema.statics.build = (attrs: any) => {
  return new Picture({
    ...attrs,
  });
};

export const Picture = mongoose.model('Picture', pictureSchema);
