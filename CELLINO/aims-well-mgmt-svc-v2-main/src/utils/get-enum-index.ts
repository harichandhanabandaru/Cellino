import { BadRequestException } from "@nestjs/common";
import { isNumberString } from "class-validator";

export function getEnumIndex(s: string, e: any) { 
    let idx = e[s];
    if (idx === undefined) {
        throw new BadRequestException(`${s} enum does not exist. Accepted values are : [${Object.keys(e).filter((ele) => !isNumberString(ele)).join(", ")}]`);
    }
    return idx;
}