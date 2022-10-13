import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UsersInterface } from '../models/User';

import db from '../db/connection'

const generateToken = (params = {}): string => {
    dotenv.config();

    const SECRET = process.env.SECRET || '';

    return jwt.sign(params, SECRET, {
        expiresIn: '1d'
    });
};

class UsersController {

    async login(request: Request, response: Response): Promise<Response> {
        
        const { email, password } = request.body;

        try {
            
            const result = await db<UsersInterface>('users')
                .where({
                    email: email
                })
                .first();

            if (!result) {
                return response.status(400).send({
                    message: 'user not found'
                });
            }

            if (!await bcrypt.compare(password, result.password)) {
                return response.status(400).send({
                    message: 'incorrect password'
                });
            }

            return response.status(200).json({
                email,
                token: generateToken({
                    id: result.id
                })
            });
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: 'unexpected error while authenticating the user',
                error
            });
        }
    }

    async signup(request: Request, response: Response): Promise<Response> {
        const data = {
            ...request.body,
            password: await bcrypt.hash(request.body.password, 10)
        };

        const add = await db.transaction();

        const emailExists = await add<UsersInterface>('users')
            .where({ email: data.email }).first();


        if (emailExists) {
            return response.status(400).json({
                message: 'email already registered'
            });
        } 
        else {
            try {
                const id = await add<UsersInterface>('users')
                    .insert(data)
                    .returning('id');

                await add.commit();

                return response.status(201).json({
                    token: generateToken({ id })
                });
            } 
            catch (error) {
                await add.rollback();

                return response.status(400).json({
                    message: 'unexpected error while creating new user',
                    error
                });
            }
        }
    }

    async getAllUsers(request: Request, response: Response): Promise<Response> {
        const filters = request.query;

        filters.password ? filters.password = undefined : null;

        try {
            const users = await db<UsersInterface>('users')
                .where({ ...filters });

            return response.status(200).json(
                users.map(
                    (user:any) => ({
                        ...user,
                        password: undefined
                    })
                )
            );
        } catch (error) {
            return response.status(400).json({
                message: 'unexpected error while listing users',
                error
            });
        }
    }

    async getUser(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);

        try {
            const user = await db<UsersInterface>('users').where({ id }).first();

            return response.status(200).json({
                ...user,
                password: undefined
            });
        } catch (error) {
            return response.status(400).json({
                message: 'unexpected error while showing the user',
                error
            });
        }
    }

}

export default UsersController;
