/**
 * HRIS Loading Page
 * Loading state for HRIS section
 */

export default function HRISLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="text-muted-foreground">Loading HRIS...</p>
      </div>
    </div>
  );
}

