import { Request, Response } from 'express'
// import UserServices from '../services/UserServices'
import prisma from '../importPrisma';


export default {

    async UserFront(req: Request, res: Response) {
        try {
            const { email, name, subject } = req.body;
            const uniqueEmail = email + '_' + Date.now(); // Adicionar um carimbo de data/hora único
            const userFront = { name, email: uniqueEmail, subject };

            console.log('dados recebidos do front end ', userFront)
            const createDataFrontEnd = await prisma.createMessages.create({
                data: userFront
            })
        }
        catch (error) {
            console.log('erro na requisição', error)
        }
    },

    async SendFront(req: Request, res: Response) {
        try {
            const usuarios = await prisma.createMessages.findMany();
            res.json(usuarios)
        }
        catch (error) {
            console.log('error', error)
        }
        finally {

            async () => {
                await prisma.$disconnect()
            }
        }
    },
    async Userdelete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id); // Acessar o ID a partir dos parâmetros da rota
            console.log(id);
            const deletar = await prisma.createMessages.delete({
                where: {
                    id: id
                }
            })
            console.log('Mensagem Excluida', deletar)
            res.sendStatus(204);
        } catch (error) {
            console.log('Erro ao excluir o usuário:', error);
            // Responder com um status de erro adequado e uma mensagem de erro
            res.status(500).json({ error: 'Erro ao excluir a Mensagem' });
        }
    },


    async UpdateMessages(req: Request, res: Response) {
        const {ids, email , name, subject } = req.body;
        const id = ids
            // Faça a lógica de atualização aqui
            const messages = {email, id ,name, subject}


            try {
                await prisma.createMessages.update({
                  where: {
                    id: id,
                  },
                  data: messages
                });
                console.log("Registro atualizado com sucesso");
                

          } catch (error) {
            console.error('Erro ao atualizar os dados', error);
            res.status(500).json({ error: 'Erro ao atualizar os dados' });
          }
    }














}
