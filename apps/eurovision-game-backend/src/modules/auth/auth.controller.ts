import { IGetUserResponse } from "@eurovision-game-monorepo/core";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthPaths } from "../../types/paths";
import { AuthService } from "./auth.service";

@Controller(AuthPaths.AUTH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(AuthPaths.LOGIN)
	async login(
		@Res({ passthrough: true }) response: Response,
		@Body() { username, password }: IGetUserResponse
	) {
		return await this.authService.login(response, username, password);
	}
	@Post(AuthPaths.LOGOUT)
	async logout(@Res({ passthrough: true }) response: Response) {
		return await this.authService.logout(response);
	}
}
