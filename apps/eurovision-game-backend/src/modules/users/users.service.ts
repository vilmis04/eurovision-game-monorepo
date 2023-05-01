import { Injectable, Req } from "@nestjs/common";
import { RepoClient } from "../../utils/RepoClient";
import { Request } from "express";
import { User } from "./entities/user.entity";
import { JwtUtils } from "../../utils/JwtUtils";

@Injectable()
export class UsersService {
	constructor(
		private readonly repoClient: RepoClient,
		private readonly jwtUtils: JwtUtils
	) {}

	async updateUser(@Req() request: Request, requestBody: Partial<User>) {
		const { username } = this.jwtUtils.getUser(request);
		const userToUpdate = await this.repoClient.getUserByUsername(username);
		if (!userToUpdate) throw new Error("No user found");

		await this.repoClient.updateUser(username, requestBody);
	}
}
