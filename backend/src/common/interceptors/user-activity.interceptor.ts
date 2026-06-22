import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { UserActivityService } from "src/user-activity/user-activity.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserActivityInterceptor implements NestInterceptor {
  constructor(
    private readonly userActivityService: UserActivityService,
    private readonly jwtService: JwtService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    let userId = "anonymous";

    if (authHeader && typeof authHeader === "string") {
      try {
        const token = authHeader.replace("Bearer ", "").trim();
        const decoded: any = this.jwtService.decode(token);
        if (decoded && decoded.id) {
          userId = decoded.id;
        }
      } catch (err) {
        throw new UnauthorizedException("Token inválido ou malformado");
      }
    }

    const method = request.method;
    const path = request.route?.path || request.url;

    const body = { ...request.body };
    delete body.password;

    return next.handle().pipe(
      tap(async (response) => {
        try {
          await this.userActivityService.logActivity(
            userId,
            method,
            path,
            null,
            JSON.stringify({ body, response })
          );
        } catch (err) {
          console.error("Erro ao registrar atividade do usuário:", err);
        }
      })
    );
  }
}
