export const getReviewAverage = (reviews: number[]) => {
  return reviews.reduce((acc, review) => acc + review, 0) / reviews.length;
};
