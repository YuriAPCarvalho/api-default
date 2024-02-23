import Usuario from '../models/Usuario';

class UsuarioController {
  async create(req, res) {
    try {
      const novoUsuario = await Usuario.create({
        nome: 'Maria',
        cpf: '12345678901',
        email: 'maria@email.com',
        password: '123456',
      });
      res.json(novoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'ID não enviado' });
      }

      const usuario = await Usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      const usuarioAtualizado = await usuario.update(req.body);
      return res.json(usuarioAtualizado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'ID não enviado' });
      }

      const usuario = await Usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      await usuario.destroy();
      return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UsuarioController();
