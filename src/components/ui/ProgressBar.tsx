import * as React from "react";
import { cn } from "../../lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number; // 0 to 100
    max?: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, max = 100, ...props }, ref) => {
        const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

        return (
            <div
                ref={ref}
                className={cn(
                    "w-full h-2 bg-surface rounded-full overflow-hidden",
                    className
                )}
                {...props}
            >
                <div
                    className="h-full bg-success transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
