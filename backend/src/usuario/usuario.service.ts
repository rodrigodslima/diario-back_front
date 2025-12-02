import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async create(data: Usuario): Promise<Usuario> {
   
    // gera um salt
    const salt = await bcrypt.genSalt();

    // cria o hash da senha
    const senhaHash = await bcrypt.hash(data.senha, salt);

    // monta o usuário com a senha hasheada
    const usuario = this.usuarioRepository.create({
      ...data,
      senha: senhaHash,
    });

    // salva no banco
    return this.usuarioRepository.save(usuario);
  }
}
