import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export function CSharedFormLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <FormLabel className={cn("text-xs", className)}>{text}</FormLabel>;
}
