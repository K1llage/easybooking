import "dotenv/config";
import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL mancante nel file .env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const password = "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      name: "Admin",
      role: UserRole.ADMIN,
      passwordHash,
      phone: "1234567890",
    },
  });

  console.log("Admin creato:", admin.email);

  const services = [
    {
      title: "Consulenza iniziale",
      description: "Prima valutazione e piano personalizzato",
      durationMinutes: 60,
      priceCents: 6000,
    },
    {
      title: "Sessione di follow-up",
      description: "Controllo progressi e aggiornamento piano",
      durationMinutes: 45,
      priceCents: 5000,
    },
    {
      title: "Sessione online",
      description: "Consulenza da remoto",
      durationMinutes: 30,
      priceCents: 3000,
    },
  ];

  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { title: service.title },
      update: {},
      create: service,
    });

    console.log("Service creato:", created.title);
  }

  console.log("Seed completato!");
}

main()
  .catch((e) => {
    console.error("Errore nel seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });