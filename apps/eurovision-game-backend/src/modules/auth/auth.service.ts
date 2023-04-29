import { Injectable, Req, Res } from "@nestjs/common";
import { RepoClient } from "../../utils/RepoClient";
import * as bcrypt from "bcrypt";
import { Response, Request } from "express";
import { JwtUtils } from "../../utils/JwtUtils";

export interface ILoginResponse {
	success: boolean;
	errors?: string[];
	access_token?: string;
}

@Injectable()
export class AuthService {
	constructor(
		private readonly repoClient: RepoClient,
		private readonly jwtUtils: JwtUtils
	) {}

	async login(
		@Res({ passthrough: true }) response: Response,
		username: string,
		enteredPassword: string
	): Promise<ILoginResponse> {
		const user = await this.repoClient.getUserByUsername(username);

		if (!user) {
			response.status(400).send();
			throw new Error("Incorrect username");
		}
		if (!this.validateUser(enteredPassword, user.password)) {
			response.status(400).send();
			throw new Error("Incorrect password");
		}

		const { password, ...userData } = user;
		const access_token = await this.jwtUtils.generateToken(userData);

		response.cookie("jwt", access_token, {
			maxAge: 1000 * 24 * 3600,
			httpOnly: true,
		});

		return { success: true };
	}

	async validateUser(enteredPassword: string, userPassword: string) {
		return await bcrypt.compare(enteredPassword, userPassword);
	}

	async logout(@Res({ passthrough: true }) response: Response) {
		response.cookie("jwt", "", {
			maxAge: 1,
			httpOnly: true,
		});
	}

	async getRoles(@Req() request: Request) {
		const { roles } = this.jwtUtils.getUser(request);
		return roles ?? [];
	}
}
