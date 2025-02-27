import * as React from 'react';
import { Input as BaseInput } from '@base-ui-components/react/input';
import { cn } from '../lib/utils';

export default function Input({ className, ...props }) {
    return (
        <BaseInput
            className={cn("h-12 w-full rounded-md border  pl-3.5 text-base focus:outline-2 focus:-outline-offset-1 focus:outline-foreground/30 text-foreground", className)}
            {...props}
        />
    );
}
