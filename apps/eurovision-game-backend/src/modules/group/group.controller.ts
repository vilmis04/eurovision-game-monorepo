import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Req,
	Put,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { UpdateGroupRequestDto } from "./dto/update-group.request.dto";
import { CreateGroupRequestDto } from "./dto/create-group.request.dto";
import { Request } from "express";
import { Condition, ObjectId } from "mongodb";
import { RootPaths } from "../../types/paths";

@Controller(RootPaths.GROUPS)
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Post()
	create(
		@Body() createGroupDto: CreateGroupRequestDto,
		@Req() request: Request
	) {
		return this.groupService.create(createGroupDto, request);
	}

	@Delete(":id")
	remove(@Param("id") id: Condition<ObjectId>) {
		return this.groupService.remove(id);
	}

	@Get(":id")
	findOne(@Param("id") id: Condition<ObjectId>) {
		return this.groupService.findOne(id);
	}

	@Get("all/:year")
	findAll(@Param("year") year: string, @Req() request: Request) {
		return this.groupService.findAll(year, request);
	}

	@Put(":id")
	update(
		@Param("id") id: Condition<ObjectId>,
		@Body() updateGroupDto: UpdateGroupRequestDto
	) {
		return this.groupService.update(id, updateGroupDto);
	}

	@Post("invitation-link/:groupId")
	generateInvitationLink(@Param("groupId") id: string) {
		return this.groupService.generateInvitationLink(id);
	}
}
