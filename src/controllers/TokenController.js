import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

class TokenController {
  async store(req, res) {
    const { cpf = '', password = '' } = req.body;

    if (!cpf || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const usuario = await Usuario.findOne({ where: { cpf } });

    if (!usuario) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }
    if (!(await usuario.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const token = jwt.sign({ id: usuario.id, cpf: usuario.cpf }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  }
}

export default new TokenController();
