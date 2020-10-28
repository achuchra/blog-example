import mongoose from 'mongoose';

export interface ArticleAttr {
  author: string;
  title: string;
  description?: string;
  shortDescription?: string;
  icon?: string;
}

interface ArticleDoc extends ArticleAttr, mongoose.Document {
  createdAt: Date;
  lastModifiedAt: Date;
}

interface ArticleModel extends mongoose.Model<ArticleDoc> {
  build(attrs: ArticleAttr): ArticleDoc;
}

const articleSchema = new mongoose.Schema(
  {
    createdAt: Date,
    lastModifiedAt: Date,
    author: String,
    title: String,
    description: String,
    shortDescription: String,
    icon: String,
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

articleSchema.statics.build = (attrs: ArticleAttr): ArticleDoc => {
  const createdAt = new Date();
  return new Article({
    ...attrs,
    createdAt,
  });
};

articleSchema.pre('save', function (done) {
  this.set('lastModifiedAt', new Date());

  done();
});

export const Article = mongoose.model<ArticleDoc, ArticleModel>('Article', articleSchema);
