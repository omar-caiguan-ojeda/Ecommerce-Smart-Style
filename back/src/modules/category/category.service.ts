import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        products: true
      }
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: true
      }
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id); // Verificar si existe

    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar si existe

    return await this.prisma.category.delete({
      where: { id }
    });
  }
}
