"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'checked' | 'onCheckedChange'> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({
    className,
    checked,
    onCheckedChange,
    ...props
}: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={cn(
                "peer size-4 shrink-0 rounded-sm border border-input bg-background transition-all cursor-pointer",
                "hover:border-primary/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}

export { Checkbox }
