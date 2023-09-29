import { Request, Response } from 'express'
import prisma from '../importPrisma';

let userId: number; // Declare uma variável global para armazenar o userId
export function outroComponente(userIdParam: number) {
    userId = userIdParam
}
export default {
    async CreateMessages(req: Request, res: Response) {
        console.log(userId)
        try {
            const { email, name, subject } = req.body;
            const uniqueEmail = email + '_' + Date.now(); // Adicionar um carimbo de data/hora único
            const DataMesssages = { name, email: uniqueEmail, subject, userId };

            console.log('Mensagem Cadastrada', DataMesssages)
            const createDataFrontEnd = await prisma.createMessages.create({
                data: DataMesssages
            })
        }
        catch (error) {
            console.log('erro na requisição', error)
        }
    },
    async ShowMessages(req: Request, res: Response) {
        try {
            const MessagesData = await prisma.createMessages.findMany({
                where: {
                    userId: userId
                }
            });
            const messagesToDelete = await prisma.createMessages.findMany({
                where: {
                    userId: null,
                },
            });
            // Exclua as mensagens encontradas
            for (const message of messagesToDelete) {
                await prisma.createMessages.delete({
                    where: {
                        id: message.id,
                    },
                });
            }
            console.log('dados resgatados de mensagem ', MessagesData)
            res.json(MessagesData)
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
    async DeleteMessages(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id); // Acessar o ID a partir dos parâmetros da rota
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
        const { ids, email, name, subject } = req.body;
        const id = ids
        // Faça a lógica de atualização aqui
        const messages = { email, id, name, subject }
        try {
            await prisma.createMessages.update({
                where: {
                    id: id,
                },
                data: messages
            });
            console.log("Dados da Mensagem atualizados", messages);
        } catch (error) {
            console.error('Erro ao atualizar os dados', error);
            res.status(500).json({ error: 'Erro ao atualizar os dados' });
        }

    }


}
