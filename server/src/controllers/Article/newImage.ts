// @ts-nocheck
import { Response, Request } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import path from 'path';
import { BadRequestError } from '../../errors/bad-request-error';
import { Picture } from '../../models/Picture';

export const newImage = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('Image faile is required!');
  }

  const image = {
    author: mongoose.Types.ObjectId(req.currentUser!.id),
    title: req.body.title || '',
  };

  const streamSharp = sharp(req.file.path);

  const original = await streamSharp
    .clone()
    .png()
    .toFile(
      `${path.resolve(__dirname, '../../../public/articles-icon/')}/original_${req.file.filename.split('.')[0]}.png`,
    );

  const icon = await streamSharp
    .clone()
    .resize({
      width: 300,
    })
    .png()
    .toFile(`${path.resolve(__dirname, '../../../public/articles-icon/')}/icon_${req.file.filename.split('.')[0]}.png`);

  image.original = {
    path: `/articles-icon/original_${req.file.filename.split('.')[0]}.png`,
    resolutions: {
      width: original.width,
      height: original.height,
    },
  };

  image.icon = {
    path: `/articles-icon/icon_${req.file.filename.split('.')[0]}.png`,
    resolutions: {
      width: icon.width,
      height: icon.height,
    },
  };

  const img = Picture.build(image);
  await img.save();

  res.send(img);
};
