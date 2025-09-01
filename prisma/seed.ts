import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'devbafaqih@gmail.com' },
        update: {},
        create: {
            email: 'devbafaqih@gmail.com',
            firstName: 'Muhammad',
            lastName: 'Bafaqih',
            activated: true,
            roleUser: "F_ADMIN",
            password: '$2b$10$kq8HuyUhsYbL24iygg0Xfuf5VPV6pHPzagZBSwhN7c455TrNjdh3u',//Cakra123$
            login: 'admin',
        }
    });

    const cashPos = await prisma.cashPos.create({
        data: {
            amount: 0,
            userId: user.id
        }
    })

    const sysMenu = await prisma.sysMenu.createMany({
        data: [
            {
                menuCode: 'DSB',
                title: 'Dashboard',
                url: '/dashboard',
                icon: 'LayoutDashboard',
                isAdmin: false
            },
            {
                menuCode: 'INV',
                title: 'My Invoice',
                url: '/invoice',
                icon: 'Receipt',
                isAdmin: false
            },
            {
                menuCode: 'TRS',
                title: 'Transaction History',
                url: '/transaction',
                icon: 'CreditCard',
                isAdmin: false
            },
            {
                menuCode: 'SVN',
                title: 'Saving',
                url: '/saving',
                icon: 'Package',
                isAdmin: false
            },
            {
                menuCode: 'INS',
                title: 'Instrument',
                url: '/instrument',
                icon: 'Tags',
                isAdmin: true
            },
            {
                menuCode: 'SYM',
                title: 'System Menu',
                url: '/sys-menu',
                icon: 'ListChecks',
                isAdmin: true
            },
        ]
    })

    const instrument = await prisma.instrument.createMany({
        data: [
            {
                instrumentCode: 'CSH',
                instrumentName: 'Cash',
                buyPrice: 1,
                sellPrice: 1
            },
            {
                instrumentCode: 'LGM',
                instrumentName: 'Gold',
                buyPrice: 1,
                sellPrice: 1
            }
        ]
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })