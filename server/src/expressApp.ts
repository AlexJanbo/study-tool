import express, { Application } from 'express';
import cors from 'cors';

export const expressApp = async (app: Application) => {

    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true, limit: '5mb' }));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

}
