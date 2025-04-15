import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import path from 'path';

import { AuthModule } from 'src/routes/auth/auth.module';
import { BrandTranslationModule } from 'src/routes/brand/brand-translation/brand-translation.module';
import { BrandModule } from 'src/routes/brand/brand.module';
import { CategoryTranslationModule } from 'src/routes/category/category-translation/category-translation.module';
import { CategoryModule } from 'src/routes/category/category.module';
import { LanguageModule } from 'src/routes/language/language.module';
import { MediaModule } from 'src/routes/media/media.module';
import { PermissionModule } from 'src/routes/permission/permission.module';
import { ProductTranslationModule } from 'src/routes/product/product-translation/product-translation.module';
import { ProductModule } from 'src/routes/product/product.module';
import { ProfileModule } from 'src/routes/profile/profile.module';
import { RoleModule } from 'src/routes/role/role.module';
import { UserModule } from 'src/routes/user/user.module';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import CustomZodValidationPipe from 'src/shared/pipes/zod-validation.pipe';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.resolve('src/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
      typesOutputPath: path.resolve('src/generated/i18n.generated.ts'),
    }),
    SharedModule,
    AuthModule,
    LanguageModule,
    PermissionModule,
    RoleModule,
    ProfileModule,
    UserModule,
    MediaModule,
    BrandModule,
    BrandTranslationModule,
    CategoryModule,
    CategoryTranslationModule,
    ProductModule,
    ProductTranslationModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
