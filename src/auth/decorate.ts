import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common"

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

// export const CurrentUser = createParamDecorator((data, req) => {
//     const user = req.switchToHttp().getRequest().user;
//     // console.log(req.switchToHttp().getRequest())
//     console.log(req.getRequest())
//     return user;
// })
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
    //   console.log(request)
      return request.user; // Returns the user object attached to the request
    },
  );