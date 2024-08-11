import { NextResponse } from "next/server";

export const GET = () => {
    let res = { msg: "hello world" };
    return NextResponse.json(res);
}