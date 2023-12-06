import { PrismaClient } from '@prisma/client';
import PermissionsData from './data/permissions.json';
import RolesData from './data/roles.json';
const prisma = new PrismaClient();

async function seed() {
  console.info('Seeding database...');
  await seedPermission();
  await seedRoles();

  void prisma.$disconnect();

  console.info('Seeded database successfully');
}

async function seedPermission() {
  // Delete existing permissions
  await deletePermissions();
  console.log('Seeding permissions ...');

  console.log(PermissionsData);
  await prisma.permission.createMany({
    data: PermissionsData,
  });

  return true;
}
async function seedRoles() {
  console.log('Seeding roles ...');
  const rolePromises = RolesData.map(async (role) => {
    const listPermissions = [];

    for (const permission of role.permissions) {
      const getPermissions = await prisma.permission.findFirst({
        where: {
          action: permission.action,
          subject: permission.subject,
          conditions: {
            equals: permission.conditions || null,
          },
        },
      });

      if (getPermissions && getPermissions.id) {
        listPermissions.push({
          id: getPermissions.id,
        });
      }
    }
    const getRole = await prisma.role.findFirst({
      where: {
        key: role.key,
      },
    });
    if (getRole) {
      await prisma.role.update({
        where: {
          id: getRole.id,
        },
        data: {
          permissions: {
            connect: listPermissions,
          },
        },
      });
    } else {
      await prisma.role.create({
        data: {
          name: role.name,
          key: role.key,
          description: role.description,
          permissions: {
            connect: listPermissions,
          },
        },
      });
    }

    console.log(`Seeding role ${role.name} completed!`);
  });

  await Promise.all(rolePromises);
}

async function deletePermissions() {
  console.log('Deleting existing roles and permissions ...');

  // Delete all permissions
  await prisma.permission.deleteMany();

  console.log('Deleted existing roles and permissions!');
  return true;
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
