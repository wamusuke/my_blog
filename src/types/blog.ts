export type Blog = {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  thumbnail: string;
  createdDate: string;
  updatedDate: string;
  publishedDate: string;
};

export type Tag = {
  id: string;
  tag: string;
  createdDate: string;
  updatedDate: string;
  publishedDate: string;
};
