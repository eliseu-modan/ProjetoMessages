import { PrismaClient  } from "@prisma/client";

const prisma =new PrismaClient();

export class UserServices {
    users = {
        username: 'Eliseu Modanesi Junior',
        email: 'EliseuModanesi@Seg.com'
    };

    getUsers() {
   return this.users
        };       
    }

export default UserServices