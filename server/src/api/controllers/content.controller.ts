import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
	UseGuards,
	Get,
	Query,
	Delete,
	Param,
	BadRequestException,
	Post,
	Put,
	Body,
	UsePipes,
	ValidationPipe,
	UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Api } from '../../common/aspects/decorator';
import { ContentService } from '../../common/services/content.service';
import { UpdateContentDto, CreateContentDto } from '../../common/dtos/content.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';

@Api('content')
@ApiUseTags('content')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class ContentController {
	constructor(private readonly contentService: ContentService) {}

	@Get(':id')
	async findOne(@Param('id') id) {
		if (!id) throw new BadRequestException('参数 id 错误');

		return await this.contentService.findOneById(id);
	}

	@Get('list')
	async list(@Query() payload) {
		return await this.contentService.query(payload);
	}

	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateContentDto) {
		return await this.contentService.save(dto);
	}

	@Put()
	@UsePipes(new ValidationPipe())
	async update(@Body() dto: UpdateContentDto) {
		return await this.contentService.save(dto);
	}

	@Delete()
	async remove(@Query() payload) {
		return await this.contentService.remove(payload.selectedRows.split(','));
	}
}