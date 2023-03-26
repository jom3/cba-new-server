import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { LoginDto } from './dto/login.dto';
import { RecoverDto } from './dto/recover.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('recover')
  recover(@Body() recoverDto:RecoverDto) {
    return this.authService.recover(recoverDto);
  }

  @Patch('modificarPassword/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() changePasswordDto:ChangePasswordDto) {
    return this.authService.modificarPassword(id, changePasswordDto);
  }

}
