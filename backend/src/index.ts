const { PrismaClient } = require('@prisma/client');
import fastify, { FastifyInstance, RouteShorthandOptions, RequestGenericInterface } from 'fastify';
import { truncate } from 'fs';
import { request } from 'http';
import { Answer } from '../types';
const prisma = new PrismaClient();

const app: FastifyInstance = fastify({ logger: false });

app.register((fastify, options, done) => {
  fastify.register(require('fastify-cors'), {
    origin: '*',
  });
  done();
});

/* Auth */

app.post(`/signup`, async (req, res) => {
  const { name, email }: any = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.send(newUser);
});

/* User */

app.get('/user/:id', async (req, res) => {
  const { id }: any = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.send(user);
});

app.get('/userorgs/:userId', async (req, res) => {
  const { userId }: any = req.params;
  const orgs = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      organizations: true,
    },
  });
  res.send(orgs);
});

/* Me */
app.get('/user/:id/votings', async (req, res) => {
  const { id }: any = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      voters: {
        select: { voting: true },
      },
    },
  });
  res.send(user);
});

/* Orgs */
app.post('/addorg', async (req, res) => {
  const { name }: any = req.body;

  const newOrg = await prisma.organization.create({
    data: {
      name: name,
    },
  });
  res.send(newOrg);
});
app.get('/org/:id', async (req, res) => {
  const { id }: any = req.params;
  const result = await prisma.organization.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      users: true,
      votings: true,
    },
  });
  res.send(result);
});
app.get('/orgusers/:orgId', async (req, res) => {
  const { orgId }: any = req.params;
  const result = await prisma.organization.findUnique({
    where: {
      id: Number(orgId),
    },
  });
  res.send(result);
});
app.put('/org/:id/user', async (req, res) => {
  const { id }: any = req.params;
  const { userId }: any = req.body;
  const result = await prisma.organization.update({
    where: {
      id: Number(id),
    },
    data: {
      users: {
        connect: {
          id: Number(userId),
        },
      },
    },
  });
  res.send(result);
});
/* Voting */
app.post('/addvoting', async (req, res) => {
  // const { id }: any = req.params;
  const { title, answers }: any = req.body;
  const newVoting = await prisma.voting.create({
    data: {
      title,
    },
  });
  async function createAnswers(title: string) {
    await prisma.answer.create({
      data: {
        title: title,
        voting: {
          connect: {
            id: newVoting.id,
          },
        },
      },
    });
  }
  answers.map((answer: any) => createAnswers(answer));
  res.send(newVoting);
});
app.get('/voting/:id', async (req, res) => {
  const { id }: any = req.params;
  const result = await prisma.voting.findUnique({
    where: { id: Number(id) },
    include: {
      answers: true,
    },
  });
  res.send(result);
});
app.delete('/voting/:id', async (req, res) => {
  const { id }: any = req.params;
  try {
    await prisma.voting.delete({
      where: { id: Number(id) },
    });
    res.send(true);
  } catch (err) {
    console.error(err);
  }
});

/* Voter */
app.post('/addvoter', async (req, res) => {
  const { userId, votingId }: any = req.body;
  const result = await prisma.voter.create({
    data: {
      user: {
        connect: {
          id: Number(userId),
        },
      },
      voting: {
        connect: {
          id: Number(votingId),
        },
      },
    },
  });
  res.send(result);
});
app.get('/voter/:id', async (req, res) => {
  const { id }: any = req.params;
  const result = await prisma.voter.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.send(result);
});
app.delete('/voter/:id', async (req, res) => {
  const { id }: any = req.params;
  try {
    await prisma.voter.delete({
      where: { id: Number(id) },
    });
    res.send(true);
  } catch (err) {
    console.error(err);
  }
});
/* Points */
app.put('/voter/:id/addpoints', async (req, res) => {
  const { id }: any = req.params;
  const { fromId, amount }: any = req.body;

  const getPointsFirst = await prisma.voter.update({
    where: {
      id: Number(fromId),
    },
    data: {
      pointsToOthers: {
        decrement: Number(amount),
      },
    },
  });

  const result = await prisma.voter.update({
    where: {
      id: Number(id),
    },
    data: {
      impactPoint: {
        increment: Number(amount),
      },
    },
  });
  res.send(result);
});

/* Vote */
app.put('/addvote/:id', async (req, res) => {
  const { id }: any = req.params;
  const { voterId }: any = req.body;
  const voter = await prisma.voter.update({
    where: { id: Number(voterId) },
    data: {
      alreadyVoted: true,
    },
    select: {
      impactPoint: true,
    },
  });
  const result = await prisma.answer.update({
    where: { id: Number(id) },
    data: {
      point: {
        increment: Number(voter.impactPoint),
      },
    },
  });
  res.send(result);
});

/* Dashboard */
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});
app.get('/orgs', async (req, res) => {
  const result = await prisma.organization.findMany();
  res.send(result);
});
app.get('/votings', async (req, res) => {
  const result = await prisma.voting.findMany({
    include: {
      answers: true,
    },
  });
  res.send(result);
});
const server = app.listen(4000, () =>
  console.log(`
 Server is up at: http://localhost:4000 🚀
   `),
);
