"use client"

import React from "react";

export function SocketProvider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}