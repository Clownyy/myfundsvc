import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	const config = new DocumentBuilder()
		.setTitle('My Funds Services')
		.setDescription('My Funds Services Managed by Vitation Team')
		.setVersion('BETA')
		.addSecurity('bearer', {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			in: 'header'
		})
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
			docExpansion: 'none',
			url: '/api-docs'
		}
	});
	app.getHttpAdapter().get('/api-docs', (req, res) => {
		res.json(document);
	})
	await app.listen(4300);
}
bootstrap();
