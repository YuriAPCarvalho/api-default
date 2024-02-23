import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login requerido'],
    });
  }
  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, cpf } = dados;

    const usuario = await Usuario.findOne({ where: { id, cpf } });

    if (!usuario) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.usuarioId = id;
    req.usuarioCpf = cpf;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
