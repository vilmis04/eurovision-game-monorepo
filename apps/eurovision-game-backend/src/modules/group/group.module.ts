import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { RepoClient } from "../../utils/RepoClient";
import { JwtUtils } from "../../utils/JwtUtils";

@Module({
	controllers: [GroupController],
	providers: [GroupService, RepoClient, JwtUtils],
})
export class GroupModule {}
