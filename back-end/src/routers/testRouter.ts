import { Router, Request, Response } from "express";
import { prisma } from "../database.js";

const testRouter = Router();

testRouter.post('/ready-db', async (_req: Request, res: Response) => {
  await prisma.$queryRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
  await prisma.recommendation.createMany({
    data: [
      {
        name: 'sleepmakeswaves - Cascades',
        youtubeLink: 'https://youtu.be/LluWlHGvE2w',
        score: 18
      },
      {
        name: 'Caspian - Wildblood',
        youtubeLink: 'https://youtu.be/TKJIjg_UKX8',
        score: 21
      },
      {
        name: 'Sólstafir - Hula',
        youtubeLink: 'https://youtu.be/4nkljmJVLxg',
        score: 24
      },
      {
        name: 'Meniscus - Cursed',
        youtubeLink: 'https://youtu.be/xax297Y-pY8',
        score: 9
      },
      {
        name: 'Heilung - Tenet',
        youtubeLink: 'https://youtu.be/BOAixAjugUQ',
        score: 20
      },
      {
        name: 'Alcest - Kodama',
        youtubeLink: 'https://youtu.be/IQsXnldCDeU',
        score: 28
      },
      {
        name: 'LIGHTS OUT ASIA - They Disappear into the Palms',
        youtubeLink: 'https://youtu.be/xFUDmxyNmoU',
        score: 7
      },
      {
        name: 'Etokie - Every Ghost Knows Its Shape (Live Improv)',
        youtubeLink: 'https://youtu.be/1whSpe81gvE',
        score: 3
      }
    ]
  });
  return res.sendStatus(200);
});

export default testRouter;