import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-surface bg-surface/50 backdrop-blur-sm shadow-md text-text p-6",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
