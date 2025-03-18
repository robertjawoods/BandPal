import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    console.log(error);

    return NextResponse.json({ message: "Signed out successfully" }, { status: 200 });
}
