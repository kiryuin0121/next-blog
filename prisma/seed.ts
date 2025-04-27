import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const hashedPassoword = await bcrypt.hash("testPassword", 12);
  const testImages = [
    "https://picsum.photos/seed/testImage01/600/400",
    "https://picsum.photos/seed/testImage02/600/400",
  ];
  const user = await prisma.user.create({
    data: {
      email: "testUser@test.com",
      name: "testUser",
      password: hashedPassoword,
      posts: {
        create: [
          {
            title: "新しい習慣を作るために意識したい3つのポイント",
            content:
              "新しい習慣を作るのは簡単ではありません。しかし、ちょっとした工夫で定着しやすくなります。私が意識しているのは、「目標を小さく設定すること」、「毎日決まった時間に行うこと」、「完璧を目指さないこと」の3つです。どれもシンプルですが、続けるうえでとても大切な考え方だと思います。みなさんもぜひ試してみてください！",
            topImage: testImages[0],
            published: true,
          },
          {
            title: "朝の時間を有効活用するためにやってよかったこと",
            content:
              "朝の時間を充実させるために、私はまずスマホを見る習慣をやめました。その代わりに、軽いストレッチと読書を10分ずつ取り入れたところ、驚くほど1日がスムーズにスタートできるようになりました。たった20分の変化ですが、気分も集中力もかなり違います。朝が苦手な方こそ、まず小さな習慣から始めてみるのがおすすめです！",
            topImage: testImages[1],
            published: true,
          },
        ],
      },
    },
  });
  console.log({ user });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
