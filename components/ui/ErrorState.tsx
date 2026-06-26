type ErrorStateProps = {
  title: string;
  description: string;
  buttonText?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title,
  description,
  buttonText,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl">
        ⚠️
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      {buttonText ? (
        <button
          onClick={onRetry}
          className="mt-5 rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
        >
          {buttonText}
        </button>
      ) : null}
    </div>
  );
}
