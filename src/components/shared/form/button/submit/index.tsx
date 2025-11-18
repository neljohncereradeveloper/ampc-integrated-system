import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export const CSharedFormButtonSubmit = ({
  isPending,
  className,
}: {
  isPending: boolean;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={cn("text-xs h-8 cursor-pointer", className)}
    >
      {isPending ? (
        <>
          <Spinner />
          <p>Submitting...</p>
        </>
      ) : (
        <p>Submit</p>
      )}
    </Button>
  );
};
