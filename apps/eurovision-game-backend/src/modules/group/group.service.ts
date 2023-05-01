import { Injectable, Req, Res } from "@nestjs/common";
import { UpdateGroupRequestDto } from "./dto/update-group.request.dto";
import { CreateGroupRequestDto } from "./dto/create-group.request.dto";
import { RepoClient } from "../../utils/RepoClient";
import { Request, Response } from "express";
import { JwtUtils } from "../../utils/JwtUtils";
import { Condition, ObjectId, WithId } from "mongodb";
import { UsersService } from "../users/users.service";
import { Group } from "./entities/group.entity";

@Injectable()
export class GroupService {
	constructor(
		private readonly repoClient: RepoClient,
		private readonly jwtUtils: JwtUtils,
		private readonly usersService: UsersService
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
		const response = await this.repoClient.removeGroup(id);
		if (!response.acknowledged || response.deletedCount !== 1) {
			throw new Error("Group was not deleted, internal serve error");
		}

		return response;
	}

	async findOne(id: string) {
		return await this.repoClient.findGroup(new ObjectId(id));
	}

	async findAllOwned(year: string, request: Request) {
		const { username } = this.jwtUtils.getUser(request);

		return await this.repoClient.findAllUserOwnedGroups(year, username);
	}

	async findAllJoined(year: string, request: Request) {
		const { groups } = this.jwtUtils.getUser(request);

		const joinedGroups = await Promise.all(
			groups.map(async (groupId) => {
				const group = await this.findOne(groupId);
				if (group && group.yearCreated === year) return group;
			})
		);

		return joinedGroups as WithId<Group>[];
	}

	async update(id: string, updateGroupDto: UpdateGroupRequestDto) {
		const groupToUpdate = await this.findOne(id);
		const updatedGroup = { ...groupToUpdate, ...updateGroupDto };

		return await this.repoClient.updateGroup(
			new ObjectId(id),
			updatedGroup
		);
	}

	async generateInvitationLink(id: string) {
		const token = await this.jwtUtils.encryptLink(id);
		const splitToken = token.split(".").join("/");
		// TODO: update with correct link and move to .env
		const link = `http://localhost:3000/groups/join/${splitToken}`;

		return link;
	}

	async addGroupToJoin(response: Response, token: string) {
		response.cookie("group", token, {
			maxAge: 1000 * 24 * 3600,
			httpOnly: true,
		});
	}

	async joinGroup(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	) {
		const groupToken = request.cookies?.group as string | undefined;
		if (!groupToken) return;

		const { username } = this.jwtUtils.getUser(request);
		const groupId = await this.jwtUtils.decryptLink(groupToken);

		const groupToJoin = await this.findOne(groupId);
		if (!groupToJoin) throw new Error("Group not found");
		const { members } = groupToJoin;

		const user = await this.repoClient.getUserByUsername(username);
		if (!user) throw new Error("User not found");
		const { groups } = user;

		if (!groups.includes(groupId) && !members.includes(username)) {
			await this.update(groupId, {
				members: [...groupToJoin.members, username],
			});
			await this.usersService.updateUser(request, {
				groups: [...groups, groupId],
			});
		}

		response.cookie("group", "", { maxAge: 1, httpOnly: true });
	}
}
