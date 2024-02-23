import dotenv from 'dotenv';

dotenv.config();

import './database';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/usuario/', usuarioRoutes);
    this.app.use('/token/', tokenRoutes);
    this.app.use('/aluno/', alunoRoutes);
  }
}

export default new App().app;
