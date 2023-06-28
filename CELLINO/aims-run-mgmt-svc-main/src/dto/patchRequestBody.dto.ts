import { ApiProperty } from "@nestjs/swagger";
import { PatchOperation } from "../enums/patchOperation";

export class PatchRequestBodyDTO{
    @ApiProperty({enum:[ 'replace','add','remove'],description:'op defines the operation such as replace/add/remove'})
    op:PatchOperation
    @ApiProperty({description:'path defines the field which needs to be updated as "/pathName"'})
    path:string
    @ApiProperty({description:'value to which the path will be updated to"'})
    value:string
}