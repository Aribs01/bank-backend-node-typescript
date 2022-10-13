import { Request, Response } from 'express';
import db from '../db/connection';

import { UsersInterface } from '../models/User';
import { AccountInterface } from '../models/Account';


export default class AccountController {

    async addFunds(request: Request, response: Response): Promise<Response> {

        const data = {
            ...request.body
        };

        const add = await db.transaction();

        const id = await request.body.user_id;

        const user = await db<UsersInterface>('users').where({ id }).first();
        
        const balance = (request.body.funds + user?.balance)
        
        if (data.sent_by_id) {
            const sent_by_user = await db<UsersInterface>('users').where( {id: data.sent_by_id} ).first();
            console.log(sent_by_user);

            try {
                // if he has money in the account and if the requested money is not more that his money
                if (sent_by_user?.balance && request.body.funds <= sent_by_user?.balance) {
                    
                    const sent_by_balance = ( sent_by_user?.balance - request.body.funds)
                    await add<UsersInterface>('users').update({ balance: sent_by_balance }).where({ id: data.sent_by_id });

                    await add<AccountInterface>('wallet').insert(request.body);
    
                    await add<UsersInterface>('users')
                        .update({
                            balance: balance
                        })
                        .where({ id });
                    
                    await add.commit();
                    
                    return response.status(201).json({
                        user,
                        sent_by_user
                    });
                }
                else{
                    return response.status(400).json({
                        message: 'Insufficient Balance',
                    });
                }

            } 
            catch (error) {
                await add.rollback();
    
                return response.status(400).json({
                    message: 'Unexpected error while funding wallet',
                    error
                });
            }

        }

        else

        try {

            await add<AccountInterface>('wallet').insert(request.body);

            await add<UsersInterface>('users')
                .update({
                    balance: balance
                })
                .where({ id });

            await add.commit();

            return response.status(201).json({
                user
            });
        } 
        catch (error) {
            await add.rollback();

            return response.status(400).json({
                message: 'Unexpected error while funding wallet',
                error
            });
        }
    }
}