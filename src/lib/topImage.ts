// 画像パスを正規化する関数
export const normalizeImagePath = (imagePath: string): string => {
  // 既にURLの場合（http:// または https:// で始まる場合）はそのまま返す
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // ローカル画像の場合
  // スラッシュで始まっていない場合は追加
  if (!imagePath.startsWith("/")) {
    return `/${imagePath}`;
  }
  return imagePath;
};
