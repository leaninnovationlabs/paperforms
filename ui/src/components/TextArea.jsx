import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Input({ className, ...props }) {
    return (
        <textarea
            className={cn("w-full rounded-md border px-3.5 py-2 text-base focus:outline-2 focus:-outline-offset-1 focus:outline-foreground/30 text-foreground", className)}
            {...props}
        />
    );
}
