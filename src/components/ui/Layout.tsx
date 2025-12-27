import * as React from "react";
import { cn } from "../../lib/utils";

const Container = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "mx-auto w-full max-w-md md:max-w-xl lg:max-w-4xl px-4",
            className
        )}
        {...props}
    />
));
Container.displayName = "Container";

export { Container };
