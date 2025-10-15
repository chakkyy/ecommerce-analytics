import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiOkResponse, ApiCookieAuth, ApiExtraModels } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { RecipeDto } from '@modules/recipes/dto/recipe.dto';
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get all recipes' })
  @ApiExtraModels(RecipeDto)
  @ApiOkResponse({
    status: 200,
    type: RecipeDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @Get()
  async getAllRecipes() {
    return await this.recipesService.findAll();
  }
}
