import { Injectable, Req } from "@nestjs/common";
import { UpdateGroupRequestDto } from "./dto/update-group.request.dto";
import { CreateGroupRequestDto } from "./dto/create-group.request.dto";
import { RepoClient } from "../../utils/RepoClient";
import { Request, Response } from "express";
import { JwtUtils } from "../../utils/JwtUtils";
import { Condition, ObjectId } from "mongodb";

@Injectable()
export class GroupService {
	constructor(
		private readonly repoClient: RepoClient,
		private readonly jwtUtils: JwtUtils
	) {}

	async create({ name }: CreateGroupRequestDto, @Req() request: Request) {
		const { username } = this.jwtUtils.getUser(request);

		return await this.repoClient.createGroup({
			name,
			members: [username],
			owner: username,
			yearCreated: new Date().getFullYear().toString(),
		});
	}

	async remove(id: Condition<ObjectId>) {
		return await this.repoClient.removeGroup(id);
	}

	async findOne(id: Condition<ObjectId>) {
		return await this.repoClient.findGroup(id);
	}

	async findAll(year: string, request: Request) {
		const { username } = this.jwtUtils.getUser(request);

		return await this.repoClient.findAllUsersGroups(year, username);
	}

	async update(
		id: Condition<ObjectId>,
		updateGroupDto: UpdateGroupRequestDto
	) {
		return await this.repoClient.updateGroup(id, updateGroupDto);
	}

	async generateInvitationLink(id: string) {
		const token = await this.jwtUtils.encryptLink(id);
		const link = `${window.location}/auth/groups/join/${token}`;

		return link;
	}

	async addGroupToJoin(response: Response, token: string) {
		response.cookie("evg_groups", token, {
			maxAge: 1000 * 24 * 3600,
			httpOnly: true,
		});
	}
}
