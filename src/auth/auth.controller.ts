import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';
import { UserResponse } from './interfaces/user-response';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login-token')
  loginv2(@Body() loginDto: LoginDto) {
    return this.authService.loginToken(loginDto);
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll(@Request() request: Request) {
    const user = request['user'];
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'] as User;
    return {
      user,
      token: this.authService.getJwtToken({id: user._id})
    };
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUser(@Request() req: Request): UserResponse {
    const user = req['user'] as User;
    return {
      ...user
    };
  }

}
